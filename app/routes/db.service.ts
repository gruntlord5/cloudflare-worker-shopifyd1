import type { D1Database } from '@cloudflare/workers-types';

/**
 * Service class for handling database operations with Cloudflare D1
 * Provides methods for executing queries and retrieving data
 */
class DatabaseService {
  // The D1 database instance
  private db: D1Database | undefined;
  // Track the current binding name
  private currentBinding: string = 'DB';

  /**
   * Constructor that optionally accepts a D1 database instance
   * @param db - Optional D1Database instance
   * @param bindingName - Optional binding name
   */
  constructor(db?: D1Database, bindingName: string = 'DB') {
    this.db = db;
    this.currentBinding = bindingName;
  }

  /**
   * Set the database instance directly
   * @param db - D1Database instance to use
   * @param bindingName - Optional binding name
   */
  public setDb(db: D1Database, bindingName: string = 'DB') {
    this.db = db;
    this.currentBinding = bindingName;
  }

  /**
   * Get the current binding name
   * @returns The current binding name
   */
  public getCurrentBinding(): string {
    return this.currentBinding;
  }

  /**
   * Initialize the database from the Remix context
   * @param context - The Remix loader/action context
   * @param bindingName - The D1 binding name to use (default: 'DB')
   * @returns boolean indicating if database was successfully initialized
   */
  public initFromContext(context: any, bindingName: string = 'DB'): boolean {
    // Check if Cloudflare D1 binding is available in the context
    if (context?.cloudflare?.env?.[bindingName]) {
      this.db = context.cloudflare.env[bindingName];
      this.currentBinding = bindingName;
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
      console.warn(`Attempted to execute query without database (${this.currentBinding}): ${query}`);
      throw new Error(`Database not available: ${this.currentBinding}`);
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
      console.error(`Database (${this.currentBinding}) query error:`, error);
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
      console.warn(`Attempted to get all rows without database (${this.currentBinding}): ${query}`);
      throw new Error(`Database not available: ${this.currentBinding}`);
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
      console.error(`Database (${this.currentBinding}) query error:`, error);
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
      console.warn(`Attempted to get first row without database (${this.currentBinding}): ${query}`);
      throw new Error(`Database not available: ${this.currentBinding}`);
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
      console.error(`Database (${this.currentBinding}) query error:`, error);
      throw error;
    }
  }

  /**
   * Create a table if it doesn't exist
   * @param tableName - Name of the table to create
   * @param schema - SQL schema definition for the table
   * @returns Result of the create table operation
   */
  public async createTableIfNotExists(tableName: string, schema: string) {
    return this.executeQuery(`CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`);
  }

  /**
   * Update or insert a key-value setting with timestamp
   * @param tableName - Name of the table to use
   * @param key - Setting key
   * @param value - Setting value
   * @returns Result of the upsert operation
   */
  public async updateSetting(tableName: string, key: string, value: any) {
    return this.executeQuery(
      `INSERT OR REPLACE INTO ${tableName} (key, value, updated_at) VALUES (?, ?, ?)`,
      [key, String(value), Date.now()]
    );
  }

  /**
   * Get a setting value by key
   * @param tableName - Name of the table to query
   * @param key - Setting key to retrieve
   * @returns The setting value or undefined if not found
   */
  public async getSetting(tableName: string, key: string) {
    return this.getFirstRow(`SELECT value FROM ${tableName} WHERE key = ?`, [key]);
  }

  /**
   * Get all settings from a table
   * @param tableName - Name of the table to query
   * @returns All settings in the table
   */
  public async getAllSettings(tableName: string) {
    return this.getAllRows(`SELECT key, value, updated_at FROM ${tableName}`);
  }

  /**
   * Initialize a settings table with key-value-timestamp schema
   * @param tableName - Name of the table to create
   * @returns Result of the create table operation
   */
  public async initSettingsTable(tableName: string) {
    return this.createTableIfNotExists(
      tableName,
      'key TEXT PRIMARY KEY, value TEXT, updated_at INTEGER'
    );
  }
}

// Export a singleton instance of the DatabaseService
// This ensures we have a single shared instance across the application
const dbService = new DatabaseService();
export default dbService;