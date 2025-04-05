import { useEffect, useState } from "react";
import SearchForm from "@/components/search-form";
import EmptyState from "@/components/empty-state";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Fetch recent searches
  const { data: searchData } = useQuery({
    queryKey: ['/api/searches/recent'],
    staleTime: 1000 * 60, // 1 minute
  });

  useEffect(() => {
    if (searchData?.searches) {
      setRecentSearches(searchData.searches);
    }
  }, [searchData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Research Companies for Your Interview
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Get comprehensive insights about any company in seconds. Prepare better, interview smarter.
        </p>
        
        {/* Search Form Component */}
        <SearchForm recentSearches={recentSearches} />
      </section>
      
      {/* Empty State */}
      <EmptyState />
    </div>
  );
}
