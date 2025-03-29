import { generateMockResponse } from './mock-data';

// API Client for candidate-mapping-agent backend
const BACKEND_URL = 'http://localhost:8000';
const API_PREFIX = '/api/v1';
const USE_MOCK = true; // Set to false to use real API

// Search types
export enum SearchField {
  KEYWORDS = "keywords",
  TITLE = "title",
  COMPANY = "company",
  LOCATION = "location",
  INDUSTRY = "industry"
}

export enum SearchOperator {
  CONTAINS = "contains",
  EQUALS = "equals",
  STARTS_WITH = "starts_with",
  ENDS_WITH = "ends_with"
}

export interface SearchCriteria {
  field: SearchField;
  value: string;
  operator: SearchOperator;
}

export interface SearchQuery {
  criteria: SearchCriteria[];
  max_results?: number;
  include_details?: boolean;
  sort_by?: string;
  sort_order?: string;
}

export interface SearchResult {
  linkedin_id: string;
  name: string;
  title?: string;
  company?: string;
  location?: string;
  profile_url: string;
  relevance_score: number;
  last_updated: string;
}

export interface SearchResponse {
  query_id: string;
  total_results: number;
  results: SearchResult[];
  execution_time: number;
  created_at: string;
}

export class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    if (USE_MOCK) {
      return this.handleMockRequest(endpoint, options);
    }

    const headers: Record<string, string> = {
      ...options.headers as Record<string, string>,
    };

    // Only set Content-Type if not already set
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BACKEND_URL}${API_PREFIX}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(`API request failed: ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
    }

    return response.json();
  }

  private async handleMockRequest(endpoint: string, options: RequestInit = {}) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (endpoint === '/search' && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      return generateMockResponse(body);
    }

    if (endpoint.startsWith('/search/') && !endpoint.includes('/profiles/')) {
      const queryId = endpoint.split('/')[2];
      return generateMockResponse({ query_id: queryId });
    }

    if (endpoint === '/auth/token' && options.method === 'POST') {
      const formData = new URLSearchParams(options.body as string);
      const email = formData.get('username');
      const password = formData.get('password');

      // Mock authentication logic
      if (email === 'test@example.com' && password === 'password') {
        return {
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token'
        };
      } else {
        throw new Error('Invalid credentials');
      }
    }

    throw new Error('Mock endpoint not implemented');
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    if (!USE_MOCK && !this.token) {
      throw new Error('No authentication token available');
    }

    const headers = {
      ...options.headers,
      ...(this.token && !USE_MOCK ? { Authorization: `Bearer ${this.token}` } : {}),
    };

    console.log('Debug - Request headers:', headers);
    console.log('Debug - Token being used:', this.token);

    return this.fetch(endpoint, {
      ...options,
      headers,
    });
  }

  // Search endpoints
  async search(query: SearchQuery): Promise<SearchResponse> {
    return this.fetchWithAuth('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });
  }

  async getSearchResults(queryId: string): Promise<SearchResponse> {
    return this.fetchWithAuth(`/search/${queryId}`);
  }

  async getProfile(profileId: string): Promise<any> {
    return this.fetchWithAuth(`/search/profiles/${profileId}`);
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await this.fetch('/auth/token', {
      method: 'POST',
      body: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this.setToken(response.access_token);
    return response;
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const response = await this.fetch('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    this.setToken(response.access_token);
    return response;
  }

  // LinkedIn auth endpoints
  async getLinkedInAuthUrl(redirectUri: string): Promise<{ url: string }> {
    return this.fetch(`/auth/linkedin/auth-url?redirect_uri=${encodeURIComponent(redirectUri)}`);
  }

  async handleLinkedInCallback(code: string, state: string): Promise<{ access_token: string; refresh_token: string }> {
    const response = await this.fetch('/auth/linkedin/callback', {
      method: 'POST',
      body: JSON.stringify({ code, state }),
    });
    this.setToken(response.access_token);
    return response;
  }
}

// Export a singleton instance
export const apiClient = new ApiClient(); 