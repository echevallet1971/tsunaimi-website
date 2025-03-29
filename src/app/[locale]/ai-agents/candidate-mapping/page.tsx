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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="h-48 bg-gradient-to-b from-[#7057A0] to-[#251C6B] flex items-center justify-center pt-14">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {t('title')}
        </h1>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-[#111827]">
              {t('description')}
            </p>
          </div>

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
      </div>

      {/* Visual separator before footer */}
      <div className="h-24 bg-gradient-to-b from-white to-[#F3F4F6]" />
    </div>
  );
} 