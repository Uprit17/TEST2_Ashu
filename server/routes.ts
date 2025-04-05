import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCompanySchema, 
  insertSearchHistorySchema,
  companySchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { geminiService } from "./services/gemini";

interface ApiError {
  message: string;
  code?: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Search for company
  app.get("/api/companies/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Company name is required" });
      }
      
      // Add to search history
      const searchQuery = insertSearchHistorySchema.parse({ query });
      await storage.addSearchQuery(searchQuery);
      
      // Check if company exists in storage
      const company = await storage.getCompanyByName(query);
      
      if (company) {
        return res.json(company);
      }
      
      // If not found, return 404 to indicate company needs to be researched
      return res.status(404).json({ 
        message: "Company information not found",
        query
      });
    } catch (error: any) {
      console.error("Search error:", error);
      
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      return res.status(500).json({ message: "Failed to search for company" });
    }
  });

  // Get recent searches
  app.get("/api/searches/recent", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const searches = await storage.getRecentSearches(limit);
      
      // Extract unique company names using Array.from to avoid type issues
      const uniqueQueries = Array.from(new Set(searches.map(s => s.query)));
      
      return res.json({ searches: uniqueQueries.slice(0, limit) });
    } catch (error: any) {
      console.error("Recent searches error:", error);
      return res.status(500).json({ message: "Failed to retrieve recent searches" });
    }
  });

  // Research a company using Gemini AI
  app.post("/api/companies/research", async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      
      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Company name is required" });
      }
      
      // Check if company already exists
      const existingCompany = await storage.getCompanyByName(name);
      if (existingCompany) {
        return res.json(existingCompany);
      }
      
      try {
        // Research the company using Gemini AI
        const companyData = await geminiService.researchCompany(name);
        
        // Store company in database
        const insertData = insertCompanySchema.parse(companyData);
        const company = await storage.createCompany(insertData);
        
        return res.status(201).json(company);
      } catch (error: any) {
        // If Gemini API fails (e.g., API key not set), fall back to placeholder data
        if (error.message && typeof error.message === 'string' && error.message.includes("GEMINI_API_KEY is not set")) {
          console.error("Gemini API key not set, falling back to placeholder data");
          
          // Generate a website URL based on company name
          const simpleName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
          const website = `https://www.${simpleName}.com`;
          
          const placeholderData = {
            name,
            website,
            coreBusiness: {
              summary: "Gemini API key required for comprehensive research.",
              industry: "Not available without API key",
              founders: "Not available",
              currentCEO: "Not available"
            },
            financials: {
              years: [
                { year: "2023", revenue: "Not available", growth: "N/A" },
                { year: "2022", revenue: "Not available", growth: "N/A" },
                { year: "2021", revenue: "Not available", growth: "N/A" }
              ],
              source: "Gemini API required"
            },
            funding: {
              totalRaised: "Not available",
              latestRound: "Not available",
              latestRoundDate: "Not available",
              utilization: "Gemini API key required for comprehensive research."
            },
            jobStability: {
              policies: [
                {
                  title: "API Key Required",
                  description: "Please set the GEMINI_API_KEY environment variable to fetch real company data."
                }
              ]
            },
            stability: {
              lastLayoff: {
                date: "Not available",
                details: "Gemini API key required for comprehensive research."
              },
              indicators: [
                {
                  name: "Data Availability",
                  status: "Unknown",
                  details: "API key required"
                }
              ]
            },
            interviewConsiderations: {
              considerations: [
                {
                  title: "API Integration Needed",
                  description: "Set the GEMINI_API_KEY to get AI-powered interview insights."
                }
              ]
            },
            references: {
              articles: [
                {
                  title: "No data available - Gemini API key required",
                  url: "#",
                  source: "Not available",
                  date: "Not available"
                }
              ]
            }
          };
          
          // Validate placeholder data
          const parsedData = companySchema.parse(placeholderData);
          
          // Store company in database
          const insertData = insertCompanySchema.parse(parsedData);
          const company = await storage.createCompany(insertData);
          
          return res.status(201).json(company);
        } else {
          // Other errors
          throw error;
        }
      }
    } catch (error: any) {
      console.error("Research error:", error);
      
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      return res.status(500).json({ 
        message: "Failed to research company",
        error: error?.message || String(error)
      });
    }
  });

  // Get all companies (for recent companies)
  app.get("/api/companies", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const companies = await storage.listCompanies(limit);
      return res.json({ companies });
    } catch (error: any) {
      console.error("List companies error:", error);
      return res.status(500).json({ message: "Failed to retrieve companies" });
    }
  });

  // Get company by name
  app.get("/api/companies/:name", async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      
      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "Company name is required" });
      }
      
      const company = await storage.getCompanyByName(name);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      return res.json(company);
    } catch (error: any) {
      console.error("Get company error:", error);
      return res.status(500).json({ message: "Failed to retrieve company" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
