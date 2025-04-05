import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping the original one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Companies table
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  website: text("website"),
  logoUrl: text("logo_url"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  coreBusiness: jsonb("core_business").notNull(),
  financials: jsonb("financials").notNull(),
  funding: jsonb("funding").notNull(),
  jobStability: jsonb("job_stability").notNull(),
  stability: jsonb("stability").notNull(),
  interviewConsiderations: jsonb("interview_considerations").notNull(),
  references: jsonb("references").notNull(),
  otherDetails: jsonb("other_details").notNull().default("{}"),
});

// Type definitions for each section
export const coreBusinessSchema = z.object({
  summary: z.string(),
  industry: z.string(),
  founders: z.string(),
  currentCEO: z.string(),
  headquarters: z.string(),
});

export const financialYearSchema = z.object({
  year: z.string(),
  revenue: z.string(),
  growth: z.string().optional(),
  isPositive: z.boolean().optional(),
});

export const financialsSchema = z.object({
  years: z.array(financialYearSchema),
  source: z.string().optional(),
  reliabilityAlert: z.string().optional(),
});

export const fundingSchema = z.object({
  totalRaised: z.string(),
  rounds: z.string().optional(),
  latestRound: z.string(),
  latestRoundDate: z.string(),
  utilization: z.string(),
});

export const policySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const jobStabilitySchema = z.object({
  policies: z.array(policySchema),
});

export const stabilityIndicatorSchema = z.object({
  name: z.string(),
  status: z.string(),
  details: z.string(),
});

export const stabilitySchema = z.object({
  lastLayoff: z.object({
    date: z.string(),
    details: z.string(),
  }),
  indicators: z.array(stabilityIndicatorSchema).optional(),
});

export const considerationSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const interviewConsiderationsSchema = z.object({
  considerations: z.array(considerationSchema),
  businessRoles: z.array(considerationSchema),
  technicalRoles: z.array(considerationSchema),
});

export const referenceSchema = z.object({
  title: z.string(),
  url: z.string(),
  source: z.string(),
  date: z.string(),
});

export const referencesSchema = z.object({
  articles: z.array(referenceSchema),
});

// Define other details schema
export const otherDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const otherDetailsSchema = z.object({
  details: z.array(otherDetailSchema),
});

// Company schema for insertion
export const companySchema = z.object({
  name: z.string(),
  website: z.string().optional(),
  logoUrl: z.string().optional(),
  coreBusiness: coreBusinessSchema,
  financials: financialsSchema,
  funding: fundingSchema,
  jobStability: jobStabilitySchema,
  stability: stabilitySchema,
  interviewConsiderations: interviewConsiderationsSchema,
  references: referencesSchema,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  updatedAt: true,
});

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

// Search History
export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertSearchHistorySchema = createInsertSchema(searchHistory).omit({
  id: true,
  timestamp: true,
});

export type InsertSearchHistory = z.infer<typeof insertSearchHistorySchema>;
export type SearchHistory = typeof searchHistory.$inferSelect;
