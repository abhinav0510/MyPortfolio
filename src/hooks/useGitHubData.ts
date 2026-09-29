'use client';

import { useState, useEffect } from 'react';

export interface GitHubActivity {
  action: string;
  target: string;
  time: string;
  type: string;
  detail?: string;
}

export interface GitHubCommitItem {
  title: string;
  hash: string;
  time: string;
  repo: string;
}

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

export interface CurrentMonthStats {
  year: number;
  month: number;
  monthName: string;
  monthStart: string;
  today: string;
  
  totalContributions: number;
  commits: number;
  pullRequests: number;
  issues: number;
  repositories: number;
  
  calendar: GitHubContributionDay[];
}

export interface GitHubLanguageItem {
  name: string;
  percentage: number;
}

export interface GitHubResponseData {
  success: boolean;
  username: string;
  name: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  languages: GitHubLanguageItem[];
  
  currentMonth: CurrentMonthStats;
  
  activities: GitHubActivity[];
  commits: GitHubCommitItem[];
}

export interface UseGitHubDataOptions {
  username?: string;
  year?: number;
  month?: number;
}

export function useGitHubData(opts?: string | UseGitHubDataOptions) {
  const username = typeof opts === 'string' ? opts : opts?.username;
  const year = typeof opts === 'object' ? opts?.year : undefined;
  const month = typeof opts === 'object' ? opts?.month : undefined;

  const [data, setData] = useState<GitHubResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        if (username) params.set('username', username);
        if (year) params.set('year', year.toString());
        if (month) params.set('month', month.toString());
        
        const queryString = params.toString() ? `?${params.toString()}` : '';
        const res = await fetch(`/api/github${queryString}`);
        
        if (!res.ok) {
          throw new Error('Unable to load GitHub activity');
        }
        
        const json = await res.json();
        
        if (!json.success) {
          throw new Error(json.error || 'Unable to load GitHub activity');
        }
        
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Unable to load GitHub activity');
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
  }, [username, year, month]);

  return { data, loading, error };
}


