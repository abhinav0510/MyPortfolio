'use client';

import { useState, useEffect } from 'react';

export interface GitHubActivity {
  action: string;
  target: string;
  time: string;
  type: string;
}

export interface GitHubCommitItem {
  title: string;
  hash: string;
  time: string;
  repo: string;
}

export interface GitHubStatsData {
  contributions: number;
  commits: number;
  prs: number;
  repositories: number;
  starsEarned: number;
  issuesClosed: number;
  monthlyGraph: number[];
}

export interface GitHubLanguageItem {
  name: string;
  percentage: number;
}

export interface ContributionDay {
  date: string;
  level: number;
}

export interface GitHubResponseData {
  success: boolean;
  username: string;
  name: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  contributionDays?: ContributionDay[];
  languages?: GitHubLanguageItem[];
  stats: GitHubStatsData;
  activities: GitHubActivity[];
  commits: GitHubCommitItem[];
  fallback?: boolean;
}

const defaultStats: GitHubStatsData = {
  contributions: 35,
  commits: 24,
  prs: 0,
  repositories: 16,
  starsEarned: 0,
  issuesClosed: 0,
  monthlyGraph: [2, 5, 8, 12, 14, 18, 35]
};

const defaultActivities: GitHubActivity[] = [
  { action: 'Pushed changes to', target: 'myportfolio', time: '2h ago', type: 'push' },
  { action: 'Created repository in', target: 'myportfolio', time: '5h ago', type: 'create' },
  { action: 'Pushed 3 commits to', target: 'designsample', time: '1d ago', type: 'push' }
];

const defaultCommits: GitHubCommitItem[] = [
  { title: 'Update GitHub live API integration', hash: 'a1b2c3d', time: '2h ago', repo: 'MyPortfolio' },
  { title: 'Redesign Projects section & video banners', hash: 'd4e5f6g', time: '5h ago', repo: 'MyPortfolio' },
  { title: 'Update Experience & Education cards', hash: 'h7i8j9k', time: '1d ago', repo: 'MyPortfolio' }
];

export function useGitHubData(username?: string) {
  const [data, setData] = useState<GitHubResponseData>({
    success: true,
    username: username || 'abhinav0510',
    name: 'Abhinav Srivastava',
    avatarUrl: '',
    publicRepos: 16,
    followers: 0,
    totalStars: 0,
    stats: defaultStats,
    activities: defaultActivities,
    commits: defaultCommits
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        setLoading(true);
        const query = username ? `?username=${encodeURIComponent(username)}` : '';
        const res = await fetch(`/api/github${query}`);
        if (!res.ok) throw new Error('API request failed');
        const json = await res.json();
        
        if (isMounted && json.success && !json.fallback) {
          setData({
            success: true,
            username: json.username ?? 'abhinav0510',
            name: json.name ?? 'Abhinav Srivastava',
            avatarUrl: json.avatarUrl ?? '',
            publicRepos: json.publicRepos ?? 16,
            followers: json.followers ?? 0,
            totalStars: json.totalStars ?? 0,
            languages: json.languages ?? [
              { name: 'TypeScript', percentage: 45.3 },
              { name: 'Java', percentage: 28.6 },
              { name: 'JavaScript', percentage: 12.4 },
              { name: 'SQL', percentage: 8.7 },
              { name: 'Other', percentage: 5.0 }
            ],
            stats: {
              contributions: json.stats?.contributions ?? 0,
              commits: json.stats?.commits ?? 0,
              prs: json.stats?.prs ?? 0,
              repositories: json.stats?.repositories ?? json.publicRepos ?? 16,
              starsEarned: json.stats?.starsEarned ?? json.totalStars ?? 0,
              issuesClosed: json.stats?.issuesClosed ?? 0,
              monthlyGraph: json.stats?.monthlyGraph ?? [2, 5, 8, 12, 14, 18, 35]
            },
            activities: json.activities && json.activities.length > 0 ? json.activities : defaultActivities,
            commits: json.commits && json.commits.length > 0 ? json.commits : defaultCommits
          });
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGitHubData();

    // Auto-refresh live data every 60 seconds
    const interval = setInterval(fetchGitHubData, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [username]);

  return { data, loading, error };
}
