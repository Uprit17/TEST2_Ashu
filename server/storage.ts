import { 
  users, type User, type InsertUser,
  companies, type Company, type InsertCompany,
  searchHistory, type SearchHistory, type InsertSearchHistory
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Company methods
  getCompanyByName(name: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  listCompanies(limit?: number): Promise<Company[]>;
  
  // Search history methods
  addSearchQuery(query: InsertSearchHistory): Promise<SearchHistory>;
  getRecentSearches(limit?: number): Promise<SearchHistory[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Company methods
  async getCompanyByName(name: string): Promise<Company | undefined> {
    const result = await db.select().from(companies).where(ilike(companies.name, `%${name}%`));
    return result.length ? result[0] : undefined;
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const result = await db.insert(companies).values(insertCompany).returning();
    return result[0];
  }

  async listCompanies(limit: number = 10): Promise<Company[]> {
    return await db.select().from(companies).orderBy(desc(companies.updatedAt)).limit(limit);
  }

  // Search history methods
  async addSearchQuery(query: InsertSearchHistory): Promise<SearchHistory> {
    const result = await db.insert(searchHistory).values(query).returning();
    return result[0];
  }

  async getRecentSearches(limit: number = 5): Promise<SearchHistory[]> {
    return await db.select().from(searchHistory).orderBy(desc(searchHistory.timestamp)).limit(limit);
  }
}

// Switch to database storage (from memory storage)
export const storage = new DatabaseStorage();
