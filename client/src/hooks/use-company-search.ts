import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface UseCompanySearchOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useCompanySearch(options?: UseCompanySearchOptions) {
  const [searchTerm, setSearchTerm] = useState('');
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Search the company
  const searchCompany = (companyName: string) => {
    if (!companyName.trim()) return;
    
    setSearchTerm(companyName);
    setLocation(`/company/${encodeURIComponent(companyName.trim())}`);
  };

  // Research a company
  const researchMutation = useMutation({
    mutationFn: async (companyName: string) => {
      const res = await apiRequest('POST', '/api/companies/research', { name: companyName });
      return res.json();
    },
    onSuccess: (data) => {
      // Invalidate queries to update cache
      queryClient.invalidateQueries({
        queryKey: [`/api/companies/search?q=${encodeURIComponent(searchTerm)}`]
      });
      queryClient.invalidateQueries({
        queryKey: ['/api/searches/recent']
      });
      
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      toast({
        title: 'Research Failed',
        description: 'Unable to research company at this time',
        variant: 'destructive',
      });
      
      if (options?.onError) {
        options.onError(error);
      }
    }
  });

  // Get recent searches
  const { data: recentSearchesData } = useQuery({
    queryKey: ['/api/searches/recent'],
    staleTime: 1000 * 60, // 1 minute
  });
  
  const recentSearches = recentSearchesData?.searches || [];

  return {
    searchTerm,
    setSearchTerm,
    searchCompany,
    researchCompany: researchMutation.mutate,
    isResearching: researchMutation.isPending,
    recentSearches,
  };
}
