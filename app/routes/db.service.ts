import type { D1Database } from '@cloudflare/workers-types';

/**
 * Service class for handling database operations with Cloudflare D1
 * Provides methods for executing queries and retrieving data
 */
class DatabaseService {
  // The D1 database instance
  private db: D1Database | undefined;

  /**
   * Constructor that optionally accepts a D1 database instance
   * @param db - Optional D1Database instance
   */
  constructor(db?: D1Database) {
    this.db = db;
  }

  /**
   * Set the database instance directly
   * @param db - D1Database instance to use
   */
  public setDb(db: D1Database) {
    this.db = db;
  }

  /**
   * Initialize the database from the Remix context
   * @param context - The Remix loader/action context
   * @returns boolean indicating if database was successfully initialized
   */
  public initFromContext(context: any): boolean {
    // Check if Cloudflare D1 binding is available in the context
    if (context?.cloudflare?.env?.DB) {
      this.db = context.cloudflare.env.DB;
      return true;
    }
    return false;
  }

  /**
   * Execute a database query with optional parameters
   * @param query - SQL query string (must be D1-compatible and preferably on a single line)
   * @param params - Array of parameters to bind to the query
   * @returns The query execution result
   * @throws Error if database is not available or query fails
   */
  public async executeQuery(query: string, params: any[] = []) {
    // Check if database is initialized
    if (!this.db) {
      console.warn(`Attempted to execute query without database: ${query}`);
      throw new Error("Database not available");
    }
    
    try {
      // Note: D1 requires SQL queries to be compatible with SQLite syntax
      // For queries with parameters, use prepare and bind
      if (params.length > 0) {
        const statement = this.db.prepare(query);
        // Bind each parameter individually by position
        return await statement.bind(...params).run();
      } else {
        // For queries without parameters, use exec
        return await this.db.exec(query);
      }
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  /**
   * Get all rows matching a query with optional parameters
   * @param query - SQL query string (must be D1-compatible and preferably on a single line)
   * @param params - Array of parameters to bind to the query
   * @returns Object containing query results
   * @throws Error if database is not available or query fails
   */
  public async getAllRows(query: string, params: any[] = []) {
    // Check if database is initialized
    if (!this.db) {
      console.warn(`Attempted to get all rows without database: ${query}`);
      throw new Error("Database not available");
    }
    
    try {
      // Note: D1 requires SQL queries to be compatible with SQLite syntax
      const statement = this.db.prepare(query);
      // Execute with or without parameters
      if (params.length > 0) {
        return await statement.bind(...params).all();
      } else {
        return await statement.all();
      }
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  /**
   * Get the first row matching a query with optional parameters
   * @param query - SQL query string (must be D1-compatible and preferably on a single line)
   * @param params - Array of parameters to bind to the query
   * @returns The first row or undefined if no results
   * @throws Error if database is not available or query fails
   */
  public async getFirstRow(query: string, params: any[] = []) {
    // Check if database is initialized
    if (!this.db) {
      console.warn(`Attempted to get first row without database: ${query}`);
      throw new Error("Database not available");
    }
    
    try {
      // Note: D1 requires SQL queries to be compatible with SQLite syntax
      const statement = this.db.prepare(query);
      // Execute with or without parameters
      if (params.length > 0) {
        return await statement.bind(...params).first();
      } else {
        return await statement.first();
      }
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }
}

// Export a singleton instance of the DatabaseService
// This ensures we have a single shared instance across the application
const dbService = new DatabaseService();
export default dbService;