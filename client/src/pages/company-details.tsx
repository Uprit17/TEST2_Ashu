import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import CoreBusiness from "@/components/company/core-business";
import Financials from "@/components/company/financials";
import Funding from "@/components/company/funding";
import JobStability from "@/components/company/job-stability";
import Stability from "@/components/company/stability";
import InterviewConsiderations from "@/components/company/interview-considerations";
import References from "@/components/company/references";
import FeedbackForm from "@/components/feedback-form";

import LoadingState from "@/components/loading-state";
import { Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Company } from "@shared/schema";

export default function CompanyDetails() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute<{ companyName: string }>("/company/:companyName");
  const { toast } = useToast();
  const companyName = params?.companyName ? decodeURIComponent(params.companyName) : "";
  const [isResearching, setIsResearching] = useState(false);
  const [researchFailed, setResearchFailed] = useState(false);

  // Define researchCompany function
  const researchCompany = useCallback(async (name: string) => {
    setIsResearching(true);
    try {
      const res = await apiRequest("POST", "/api/companies/research", { name });
      const data = await res.json();
      
      // Invalidate queries to update cache
      queryClient.invalidateQueries({ 
        queryKey: [`/api/companies/search?q=${encodeURIComponent(name)}`] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['/api/searches/recent'] 
      });
      
      setResearchFailed(false);
      return data;
    } catch (error) {
      setResearchFailed(true);
      toast({
        title: "Research Failed",
        description: "Unable to research company at this time. Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsResearching(false);
    }
  }, [toast]);
  
  // Research company mutation
  const researchMutation = useMutation({
    mutationFn: (data: { name: string }) => researchCompany(data.name)
  });

  // Search for company
  const { 
    data: companyData, 
    isLoading: isSearching, 
    isError: isSearchError 
  } = useQuery<any>({
    queryKey: [`/api/companies/search?q=${encodeURIComponent(companyName)}`],
    enabled: !!companyName,
    retry: false
  });

  // Handle error and trigger research if company not found (but only once)
  useEffect(() => {
    if (isSearchError && !researchMutation.isPending && companyName && !researchFailed) {
      console.log("Search error - triggering research");
      researchMutation.mutate({ name: companyName });
    }
  }, [isSearchError, companyName, researchMutation, researchFailed]);

  // If no company name is provided, redirect to home
  useEffect(() => {
    if (!companyName) {
      setLocation("/");
    }
  }, [companyName, setLocation]);

  // Handle share
  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `${companyName} Research | CompanyPrep AI`,
        text: `Check out this research about ${companyName}`,
        url: window.location.href,
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Company research URL copied to clipboard",
    });
  };

  // Handle save results
  const handleSaveResults = () => {
    if (companyData) {
      // In a real app, this would save to user's account
      // For now, just save to localStorage
      const savedCompanies = JSON.parse(localStorage.getItem("savedCompanies") || "[]");
      if (!savedCompanies.includes(companyName)) {
        savedCompanies.push(companyName);
        localStorage.setItem("savedCompanies", JSON.stringify(savedCompanies));
      }
      
      toast({
        title: "Research Saved",
        description: `${companyName} research saved successfully`,
      });
    }
  };

  // Handle export as PDF (simplified for demo)
  const handleExportPDF = () => {
    toast({
      title: "Export Feature",
      description: "PDF export functionality would be implemented here in a production app",
    });
  };

  // Loading state
  if (isSearching || isResearching) {
    return <LoadingState companyName={companyName} />;
  }

  // Error state
  if (isSearchError && !researchMutation.isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center p-8 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Company Information Not Available
          </h2>
          <p className="text-gray-600 mb-3">
            We couldn't find information about <strong>"{companyName}"</strong> in our database.
          </p>
          <p className="text-gray-600 mb-6">
            This could be because the company is too new, not well-known, or you may have entered an incorrect name.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setLocation("/")} variant="default">
              Try Another Search
            </Button>
            <Button 
              onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(companyName)}+company+information`, '_blank')} 
              variant="outline"
            >
              Search on Google
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show company data
  if (companyData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{companyData.name}</h2>
            {companyData.website && (
              <p className="text-sm text-gray-500">
                <a 
                  href={companyData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline text-primary flex items-center gap-1"
                >
                  {companyData.website.replace(/^https?:\/\/(www\.)?/, '')}
                  <span className="material-icons text-sm">open_in_new</span>
                </a>
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-primary flex items-center gap-1"
              onClick={handleShareResults}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-primary flex items-center gap-1"
              onClick={handleSaveResults}
            >
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 space-y-6">
            <CoreBusiness data={companyData.coreBusiness} />
            <Financials data={companyData.financials} />
            <Funding data={companyData.funding} />
            <JobStability data={companyData.jobStability} />
            <Stability data={companyData.stability} />
            <InterviewConsiderations data={companyData.interviewConsiderations} />
          </div>
          
          <div className="lg:w-1/3">
            <References 
              data={companyData.references} 
              onExportPDF={handleExportPDF} 
            />
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Opinion Matters</h2>
          <div className="max-w-xl mx-auto">
            <FeedbackForm />
          </div>
        </div>
      </div>
    );
  }

  // Fallback empty state (should never reach here)
  return <LoadingState companyName={companyName} />;
}
