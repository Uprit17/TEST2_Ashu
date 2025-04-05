import { z } from "zod";
import { 
  companySchema, 
  coreBusinessSchema,
  financialsSchema,
  fundingSchema,
  jobStabilitySchema,
  stabilitySchema,
  interviewConsiderationsSchema,
  referencesSchema,
  otherDetailsSchema
} from "@shared/schema";

// Environment variable for API key
const API_KEY = process.env.GEMINI_API_KEY;

// Gemini API base URL - Using Gemini 1.5 Pro
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

/**
 * Formats a request to the Gemini API for company research
 */
async function researchCompany(companyName: string): Promise<z.infer<typeof companySchema>> {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  // Build query URL with API key
  const url = `${GEMINI_API_URL}?key=${API_KEY}`;

  try {
    // Create prompt for Gemini
    const prompt = `Research the company "${companyName}" and provide detailed information for a job interviewee who will be preparing for an interview. Use the most up-to-date sources to find accurate information.
    
    Format your response as a JSON object with the following structure:
    {
      "coreBusiness": {
        "summary": "A comprehensive overview of the company's business model and primary activities",
        "industry": "The industry the company operates in",
        "founders": "Names of the founders",
        "currentCEO": "Name of the current CEO",
        "headquarters": "Location of the company's headquarters (city, country)"
      },
      "financials": {
        "years": [
          {
            "year": "2024",
            "revenue": "Revenue figure with appropriate unit (e.g., $10B)",
            "growth": "Percentage growth YoY (e.g., 15%)",
            "isPositive": true/false
          },
          {
            "year": "2023",
            "revenue": "Revenue figure with appropriate unit",
            "growth": "Percentage growth",
            "isPositive": true/false
          },
          {
            "year": "2022",
            "revenue": "Revenue figure with appropriate unit",
            "growth": "Percentage growth",
            "isPositive": true/false
          }
        ],
        "source": "Source of financial information",
        "reliabilityAlert": "Add a note here if the financial information is from less reliable sources or estimations. Leave empty if information is from official reports."
      },
      "funding": {
        "totalRaised": "Total funding raised (e.g., $50M)",
        "rounds": "Number of funding rounds (e.g., Series A, B, C)",
        "latestRound": "Latest funding round (e.g., Series C)",
        "latestRoundDate": "Date of latest round (e.g., March 2025)",
        "utilization": "Description of how the company is using its funding"
      },
      "jobStability": {
        "policies": [
          {
            "title": "Policy name (e.g., Remote Work Policy)",
            "description": "Details about the policy"
          }
        ]
      },
      "stability": {
        "lastLayoff": {
          "date": "Date of the last major layoff (or 'None reported' if none)",
          "details": "Details about the layoff situation"
        },
        "indicators": [
          {
            "name": "Indicator name (e.g., 'Financial Health')",
            "status": "Status of the indicator (use exactly one of: Strong, Mixed, Weak, Unknown)",
            "details": "Details about this stability indicator"
          }
        ]
      },
      "interviewConsiderations": {
        "considerations": [
          {
            "title": "Consideration title (e.g., 'Company Culture')",
            "description": "Details about what to expect or prepare for"
          }
        ],
        "businessRoles": [
          {
            "title": "Business Assessment Topic",
            "description": "Detailed explanation of this business role interview component"
          }
        ],
        "technicalRoles": [
          {
            "title": "Technical Assessment Topic",
            "description": "Detailed explanation of this technical role interview component"
          }
        ]
      },

      "references": {
        "articles": [
          {
            "title": "Title of the reference article",
            "url": "URL to the article",
            "source": "Source name (e.g., 'TechCrunch')",
            "date": "Publication date"
          }
        ]
      }
    }
    
    Important instructions:
    1. Use the most up-to-date financial data available (2024 if available, or latest quarterly reports)
    2. If financial information is not in the public domain, use reports or articles, and add an alert in the reliabilityAlert field
    3. For interview considerations, provide SEPARATE sections for business roles and technical roles
    4. Include at least 2-3 items in each interview section (considerations, businessRoles, technicalRoles)
    5. Always include the company's headquarters location in the coreBusiness section
    6. For stability indicators, provide at least 3 different indicators with detailed explanations

    
    Use 'N/A' or 'Not available' for any information that cannot be found. If growth percentage is not available, use 'N/A' and omit the isPositive field. Ensure all numbers and percentages use proper formatting. Only include factually accurate information from reliable sources. DO NOT MAKE UP ANY INFORMATION.`;

    // Call Gemini API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    // Extract the text content from Gemini's response
    const content = data.candidates[0].content.parts[0].text;
    
    // Find the JSON object in the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Gemini's response");
    }
    
    // Parse JSON and validate with Zod
    const jsonResponse = JSON.parse(jsonMatch[0]);
    
    // Use the website provided in the response or from the company if available
    const website = jsonResponse.website || null;
    
    // Validate individual sections to ensure they conform to schemas
    const validatedCoreBusiness = coreBusinessSchema.parse(jsonResponse.coreBusiness);
    const validatedFinancials = financialsSchema.parse(jsonResponse.financials);
    const validatedFunding = fundingSchema.parse(jsonResponse.funding);
    const validatedJobStability = jobStabilitySchema.parse(jsonResponse.jobStability);
    const validatedStability = stabilitySchema.parse(jsonResponse.stability);
    const validatedInterviewConsiderations = interviewConsiderationsSchema.parse(jsonResponse.interviewConsiderations);
    const validatedReferences = referencesSchema.parse(jsonResponse.references);
    // Combine all validated data into company object
    const companyData = {
      name: companyName,
      website,
      coreBusiness: validatedCoreBusiness,
      financials: validatedFinancials,
      funding: validatedFunding,
      jobStability: validatedJobStability,
      stability: validatedStability,
      interviewConsiderations: validatedInterviewConsiderations,
      references: validatedReferences
    };
    
    // Validate the entire company object
    return companySchema.parse(companyData);
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

export const geminiService = {
  researchCompany
};