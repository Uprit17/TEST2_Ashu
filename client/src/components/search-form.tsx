import { useState, FormEvent, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, ArrowRight } from "lucide-react";

interface SearchFormProps {
  recentSearches?: string[];
}

export default function SearchForm({ recentSearches = [] }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLocation] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLocation(`/company/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Load company from recent searches
  const loadCompany = (companyName: string) => {
    setSearchTerm(companyName);
    setLocation(`/company/${encodeURIComponent(companyName)}`);
  };

  // Focus input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Enter company name (e.g., Microsoft, Airbnb)"
            className="w-full pl-10 pr-10 py-3 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={clearSearch}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6 gap-2"
          disabled={!searchTerm.trim()}
        >
          <span>Research</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      
      {recentSearches.length > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          Recently searched: 
          {recentSearches.slice(0, 3).map((search, index) => (
            <span key={search}>
              {index > 0 && ", "}
              <button 
                className="text-primary hover:underline ml-1"
                onClick={() => loadCompany(search)}
              >
                {search}
              </button>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
