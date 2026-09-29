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

  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');

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
    
    let eventsData: any[] = [];
    if (eventsRes.ok) {
      eventsData = await eventsRes.json();
    } else {
      console.warn(`GitHub Events API returned status ${eventsRes.status} for user ${username}`);
    }

    const parsedActivities: Array<{ action: string; target: string; time: string; type: string; detail?: string }> = [];
    const parsedCommits: Array<{ title: string; hash: string; time: string; repo: string }> = [];

    if (Array.isArray(eventsData) && eventsData.length > 0) {
      eventsData.forEach((event: any) => {
        const repoName = event.repo?.name ? event.repo.name.split('/')[1] || event.repo.name : 'repo';
        const timeAgo = formatTimeAgo(new Date(event.created_at));

        if (event.type === 'PushEvent') {
          const commits = event.payload?.commits || [];
          const commitCount = commits.length || event.payload?.size || 1;
          const branch = event.payload?.ref ? event.payload.ref.replace('refs/heads/', '') : '';
          const latestMsg = commits[0]?.message ? commits[0].message.split('\n')[0] : '';

          parsedActivities.push({
            action: branch ? `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${branch} in` : `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to`,
            target: repoName,
            time: timeAgo,
            type: 'push',
            detail: latestMsg || undefined
          });

          // Extract commits for Recent Commits widget
          if (Array.isArray(commits)) {
            commits.forEach((c: any) => {
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
          const ref = event.payload?.ref ? `"${event.payload.ref}"` : '';
          parsedActivities.push({
            action: `Created ${refType} ${ref} in`.trim(),
            target: repoName,
            time: timeAgo,
            type: 'create'
          });
        } else if (event.type === 'IssuesEvent') {
          const issueAction = event.payload?.action || 'updated';
          const issueTitle = event.payload?.issue?.title ? `"${event.payload.issue.title}"` : '';
          parsedActivities.push({
            action: `${capitalize(issueAction)} issue ${issueTitle} in`.trim(),
            target: repoName,
            time: timeAgo,
            type: 'issue'
          });
        } else if (event.type === 'PullRequestEvent') {
          const prAction = event.payload?.action || 'updated';
          const prTitle = event.payload?.pull_request?.title ? `"${event.payload.pull_request.title}"` : '';
          parsedActivities.push({
            action: `${capitalize(prAction)} PR ${prTitle} in`.trim(),
            target: repoName,
            time: timeAgo,
            type: 'pr'
          });
        } else if (event.type === 'IssueCommentEvent') {
          parsedActivities.push({
            action: 'Commented on issue in',
            target: repoName,
            time: timeAgo,
            type: 'comment'
          });
        } else if (event.type === 'ForkEvent') {
          parsedActivities.push({
            action: 'Forked repository',
            target: repoName,
            time: timeAgo,
            type: 'fork'
          });
        }
      });
    }

    // 4. Monthly GraphQL Query
    let totalContributions = 0;
    let commitsThisMonth = 0;
    let prsThisMonth = 0;
    let issuesThisMonth = 0;
    let accountRepositories = 0;
    let calendarDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> = [];

    // Real date for current month comparison
    const now = new Date();
    const realYear = now.getUTCFullYear();
    const realMonth = now.getUTCMonth(); // 0-indexed
    const realDay = now.getUTCDate();

    // Requested target year and month
    const requestedYear = yearParam ? parseInt(yearParam, 10) : realYear;
    const requestedMonth = monthParam ? parseInt(monthParam, 10) - 1 : realMonth; // 0-indexed
    const isCurrentMonth = requestedYear === realYear && requestedMonth === realMonth;

    // Calculate start & end of requested month
    const lastDayOfRequestedMonth = new Date(Date.UTC(requestedYear, requestedMonth + 1, 0)).getUTCDate();
    const monthStart = new Date(Date.UTC(requestedYear, requestedMonth, 1, 0, 0, 0));
    const monthEnd = isCurrentMonth
      ? new Date(Date.UTC(requestedYear, requestedMonth, realDay, 23, 59, 59, 999))
      : new Date(Date.UTC(requestedYear, requestedMonth, lastDayOfRequestedMonth, 23, 59, 59, 999));

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[requestedMonth] || 'Unknown';

    if (token) {
      try {
        const gqlQuery = `
          query ($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
                contributionCalendar {
                  weeks {
                    contributionDays {
                      contributionCount
                      contributionLevel
                      date
                    }
                  }
                }
              }
              repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false) {
                totalCount
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
          body: JSON.stringify({ 
            query: gqlQuery, 
            variables: { 
              username,
              from: monthStart.toISOString(),
              to: monthEnd.toISOString()
            } 
          }),
          cache: 'no-store'
        });

        if (gqlRes.ok) {
          const gqlData = await gqlRes.json();
          const userNode = gqlData?.data?.user;
          const collection = userNode?.contributionsCollection;
          
          if (userNode) {
            accountRepositories = userNode.repositories?.totalCount ?? 0;
          }

          if (collection) {
            commitsThisMonth = collection.totalCommitContributions ?? 0;
            prsThisMonth = collection.totalPullRequestContributions ?? 0;
            issuesThisMonth = collection.totalIssueContributions ?? 0;

            const weeks = collection.contributionCalendar?.weeks || [];
            
            const pad = (n: number) => n.toString().padStart(2, '0');
            const monthStartStr = `${requestedYear}-${pad(requestedMonth + 1)}-01`;
            const monthEndStr = `${requestedYear}-${pad(requestedMonth + 1)}-${pad(isCurrentMonth ? realDay : lastDayOfRequestedMonth)}`;

            weeks.forEach((w: any) => {
              w.contributionDays?.forEach((day: any) => {
                if (day.date >= monthStartStr && day.date <= monthEndStr) {
                  calendarDays.push({
                    date: day.date,
                    contributionCount: day.contributionCount ?? 0,
                    contributionLevel: day.contributionLevel ?? 'NONE'
                  });
                  totalContributions += (day.contributionCount ?? 0);
                }
              });
            });
          }
        } else {
          console.error('GraphQL Response Error:', await gqlRes.text());
        }
      } catch (err) {
        console.error('GraphQL fetch error:', err);
      }
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
      languages: topLanguages,
      
      // Normalized Current Month Stats
      currentMonth: {
        year: requestedYear,
        month: requestedMonth + 1,
        monthName: monthName,
        monthStart: `${requestedYear}-${(requestedMonth + 1).toString().padStart(2, '0')}-01`,
        today: `${requestedYear}-${(requestedMonth + 1).toString().padStart(2, '0')}-${(isCurrentMonth ? realDay : lastDayOfRequestedMonth).toString().padStart(2, '0')}`,
        
        totalContributions,
        commits: commitsThisMonth,
        pullRequests: prsThisMonth,
        issues: issuesThisMonth,
        repositories: accountRepositories > 0 ? accountRepositories : (userData.public_repos ?? 0),
        
        calendar: calendarDays
      },

      activities: parsedActivities.slice(0, 5),
      commits: parsedCommits.slice(0, 4)
    });
  } catch (error: any) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch GitHub data'
      },
      { status: 500 }
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
