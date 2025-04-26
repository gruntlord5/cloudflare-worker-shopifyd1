import { D1Database } from '@cloudflare/workers-types';

declare global {
  var d1GlobalDb: D1Database | undefined;
}

// For development, we might want to use a cached instance
// For production, we'll always get the fresh instance from env
const getDb = (env?: { DB: D1Database }): D1Database => {
  if (process.env.NODE_ENV !== "production") {
    // In development, use cached instance if available
    if (!global.d1GlobalDb && env?.DB) {
      global.d1GlobalDb = env.DB;
    }
    return global.d1GlobalDb;
  }
  
  // In production, always use the environment binding
  return env?.DB;
};

// Helper functions for common database operations
export const executeQuery = async (db: D1Database, query: string, params: any[] = []) => {
  const statement = db.prepare(query);
  if (params.length > 0) {
    statement.bind(...params);
  }
  return await statement.run();
};

export const getAllRows = async (db: D1Database, query: string, params: any[] = []) => {
  const statement = db.prepare(query);
  if (params.length > 0) {
    statement.bind(...params);
  }
  return await statement.all();
};

export const getFirstRow = async (db: D1Database, query: string, params: any[] = []) => {
  const statement = db.prepare(query);
  if (params.length > 0) {
    statement.bind(...params);
  }
  return await statement.first();
};

export default getDb;