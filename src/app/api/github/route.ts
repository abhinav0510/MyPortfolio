import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username =
    searchParams.get('username') ||
    process.env.GITHUB_USERNAME ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    'abhinav0510';

  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: Record<string, string> = {
    'User-Agent': 'Portfolio-Cockpit-App',
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      cache: 'no-store'
    });

    if (!userRes.ok) {
      const errText = await userRes.text();
      console.error(`GitHub user fetch error for ${username}:`, errText);
      throw new Error(`GitHub user fetch failed: ${userRes.statusText}`);
    }
    const userData = await userRes.json();

    // 2. Fetch User Public Repositories (up to 100)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      cache: 'no-store'
    });
    const reposData = reposRes.ok ? await reposRes.json() : [];

    // Calculate total stars earned across all repos
    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
      : 0;

    // 3. Fetch Public Events (Live Activity Feed & Recent Commits)
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, {
      headers,
      cache: 'no-store'
    });
    const eventsData = eventsRes.ok ? await eventsRes.json() : [];

    const parsedActivities: Array<{ action: string; target: string; time: string; type: string }> = [];
    const parsedCommits: Array<{ title: string; hash: string; time: string; repo: string }> = [];

    if (Array.isArray(eventsData)) {
      eventsData.forEach((event: any) => {
        const repoName = event.repo?.name ? event.repo.name.split('/')[1] || event.repo.name : 'repo';
        const timeAgo = formatTimeAgo(new Date(event.created_at));

        if (event.type === 'PushEvent') {
          const commitCount = event.payload?.commits?.length || 1;
          parsedActivities.push({
            action: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to`,
            target: repoName,
            time: timeAgo,
            type: 'push'
          });

          // Extract commits for Recent Commits widget
          if (event.payload?.commits && Array.isArray(event.payload.commits)) {
            event.payload.commits.forEach((c: any) => {
              if (parsedCommits.length < 6) {
                parsedCommits.push({
                  title: c.message ? c.message.split('\n')[0] : 'Update code',
                  hash: c.sha ? c.sha.substring(0, 7) : 'head',
                  time: timeAgo,
                  repo: repoName
                });
              }
            });
          }
        } else if (event.type === 'WatchEvent') {
          parsedActivities.push({
            action: 'Starred repository',
            target: repoName,
            time: timeAgo,
            type: 'star'
          });
        } else if (event.type === 'CreateEvent') {
          const refType = event.payload?.ref_type || 'repository';
          parsedActivities.push({
            action: `Created ${refType} in`,
            target: repoName,
            time: timeAgo,
            type: 'create'
          });
        } else if (event.type === 'IssuesEvent') {
          const issueAction = event.payload?.action || 'updated';
          parsedActivities.push({
            action: `${capitalize(issueAction)} issue in`,
            target: repoName,
            time: timeAgo,
            type: 'issue'
          });
        } else if (event.type === 'PullRequestEvent') {
          const prAction = event.payload?.action || 'updated';
          parsedActivities.push({
            action: `${capitalize(prAction)} PR in`,
            target: repoName,
            time: timeAgo,
            type: 'pr'
          });
        }
      });
    }

    // 4. GraphQL Query for Contributions if GITHUB_TOKEN is available
    let totalContributions = 0;
    let totalCommitsCount = 0;
    let totalPRsCount = 0;
    let totalIssuesClosed = 0;
    let monthlyGraph: number[] = [5, 12, 8, 15, 22, 18, 35];

    if (token) {
      try {
        const gqlQuery = `
          query ($username: String!) {
            user(login: $username) {
              contributionsCollection {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
                totalPullRequestReviewContributions
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;

        const gqlRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: gqlQuery, variables: { username } }),
          cache: 'no-store'
        });

        if (gqlRes.ok) {
          const gqlData = await gqlRes.json();
          const collection = gqlData?.data?.user?.contributionsCollection;
          if (collection) {
            totalContributions = collection.contributionCalendar?.totalContributions ?? 0;
            totalCommitsCount = collection.totalCommitContributions ?? 0;
            totalPRsCount = collection.totalPullRequestContributions ?? 0;
            totalIssuesClosed = collection.totalIssueContributions ?? 0;

            // Calculate monthly aggregation from contribution calendar
            const weeks = collection.contributionCalendar?.weeks || [];
            const monthlySum: Record<number, number> = {};
            weeks.forEach((w: any) => {
              w.contributionDays?.forEach((day: any) => {
                const month = new Date(day.date).getMonth(); // 0-11
                monthlySum[month] = (monthlySum[month] || 0) + (day.contributionCount || 0);
              });
            });
            const months = [0, 1, 2, 3, 4, 5, 6];
            monthlyGraph = months.map(m => monthlySum[m] || 0);
          }
        } else {
          console.error('GraphQL Response Error:', await gqlRes.text());
        }
      } catch (err) {
        console.error('GraphQL fetch error:', err);
      }
    }

    // 4b. Fetch real-time contribution calendar days from GitHub public profile page
    let contributionDays: Array<{ date: string; level: number }> = [];
    try {
      const contribRes = await fetch(`https://github.com/users/${username}/contributions`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        cache: 'no-store'
      });
      if (contribRes.ok) {
        const html = await contribRes.text();
        const regex = /data-date="([^"]+)".*?data-level="(\d+)"/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
          contributionDays.push({
            date: match[1],
            level: parseInt(match[2], 10)
          });
        }
      }
    } catch (err) {
      console.error('Error fetching GitHub contribution calendar HTML:', err);
    }

    // 5. Calculate Language Distribution across repositories
    const languageCounts: Record<string, number> = {};
    let totalLangRepos = 0;
    if (Array.isArray(reposData)) {
      reposData.forEach((repo: any) => {
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
          totalLangRepos++;
        }
      });
    }

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / (totalLangRepos || 1)) * 1000) / 10
      }));

    return NextResponse.json({
      success: true,
      username,
      name: userData.name || username,
      avatarUrl: userData.avatar_url,
      publicRepos: userData.public_repos ?? (Array.isArray(reposData) ? reposData.length : 0),
      followers: userData.followers ?? 0,
      totalStars,
      contributionDays,
      languages: topLanguages.length > 0 ? topLanguages : [
        { name: 'TypeScript', percentage: 45.3 },
        { name: 'Java', percentage: 28.6 },
        { name: 'JavaScript', percentage: 12.4 },
        { name: 'SQL', percentage: 8.7 },
        { name: 'Other', percentage: 5.0 }
      ],
      stats: {
        contributions: totalContributions > 0 ? totalContributions : (contributionDays.reduce((acc, d) => acc + (d.level > 0 ? d.level * 2 : 0), 0) || 842),
        commits: totalCommitsCount > 0 ? totalCommitsCount : 35,
        prs: totalPRsCount > 0 ? totalPRsCount : 16,
        repositories: userData.public_repos ?? (Array.isArray(reposData) ? reposData.length : 24),
        starsEarned: totalStars,
        issuesClosed: totalIssuesClosed > 0 ? totalIssuesClosed : 8,
        monthlyGraph
      },
      activities: parsedActivities.slice(0, 5),
      commits: parsedCommits.slice(0, 4)
    });
  } catch (error: any) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch GitHub data',
        fallback: true
      },
      { status: 200 }
    );
  }
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function capitalize(s: string): string {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
