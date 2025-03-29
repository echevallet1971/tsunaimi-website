'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { SearchQuery, SearchResult } from '@/lib/api/api-client';
import { createSearch, pollResults, SearchApiError, searchCache } from '@/lib/api/search-api';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import SearchStatus from './components/SearchStatus';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchState {
  currentQuery: SearchQuery | null;
  queryId: string | null;
  results: SearchResult[];
  status: "idle" | "pending" | "running" | "completed" | "failed";
  error: string | null;
  totalResults: number;
  executionTime: number;
  remainingQuota: number;
  resetTime: number;
}

export default function CandidateMappingPage() {
  const t = useTranslations('ai_agents.candidate_mapping');
  const [searchState, setSearchState] = useState<SearchState>({
    currentQuery: null,
    queryId: null,
    results: [],
    status: "idle",
    error: null,
    totalResults: 0,
    executionTime: 0,
    remainingQuota: 100,
    resetTime: Date.now() + 3600000 // 1 hour from now
  });

  // Debounce search input changes
  const debouncedSearch = useDebounce(searchState.currentQuery, 500);

  // Effect to handle debounced search
  useEffect(() => {
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = useCallback(async (query: SearchQuery) => {
    setSearchState(prev => ({
      ...prev,
      status: "pending",
      error: null
    }));

    try {
      // Check cache first
      const cacheKey = JSON.stringify(query);
      const cachedResults = searchCache.get(cacheKey);
      
      if (cachedResults) {
        setSearchState(prev => ({
          ...prev,
          results: cachedResults.results,
          totalResults: cachedResults.total_results,
          executionTime: cachedResults.execution_time,
          status: "completed"
        }));
        return;
      }

      // Create search query
      const queryId = await createSearch(query);
      setSearchState(prev => ({
        ...prev,
        currentQuery: query,
        queryId,
        status: "running"
      }));

      // Poll for results
      const results = await pollResults(queryId);
      
      // Cache the results
      searchCache.set(cacheKey, results);
      
      setSearchState(prev => ({
        ...prev,
        results: results.results,
        totalResults: results.total_results,
        executionTime: results.execution_time,
        status: "completed"
      }));
    } catch (err) {
      const error = err instanceof SearchApiError;
      setSearchState(prev => ({
        ...prev,
        status: "failed",
        error: error ? err.message : 'An error occurred',
        remainingQuota: error && err.statusCode === 429 ? err.details?.remainingQuota : prev.remainingQuota,
        resetTime: error && err.statusCode === 429 ? err.details?.resetTime : prev.resetTime
      }));
    }
  }, []);

  // Accessibility: Announce status changes
  useEffect(() => {
    if (searchState.status !== "idle") {
      const statusMessage = t(`status.${searchState.status}`);
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = statusMessage;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    }
  }, [searchState.status, t]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#251C6B]">{t('title')}</h1>
      
      {/* Search Form */}
      <div className="mb-8">
        <SearchForm 
          onSubmit={handleSearch}
          isLoading={searchState.status === "pending" || searchState.status === "running"}
          disabled={searchState.status === "failed" && searchState.error?.includes('Rate limit exceeded')}
        />
      </div>

      {/* Search Status */}
      {searchState.queryId && (
        <div className="mb-8">
          <SearchStatus
            queryId={searchState.queryId}
            status={searchState.status}
            totalResults={searchState.totalResults}
            error={searchState.error || undefined}
            executionTime={searchState.executionTime}
            remainingQuota={searchState.remainingQuota}
            resetTime={searchState.resetTime}
          />
        </div>
      )}

      {/* Search Results */}
      <SearchResults
        results={searchState.results}
        isLoading={searchState.status === "running"}
        error={searchState.error || undefined}
      />
    </div>
  );
} 