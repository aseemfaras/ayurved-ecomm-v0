import { createClient } from '@supabase/supabase-js'

// Function to create a real Supabase client
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_SUPABASE_PROJECT_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  
  // Create a Supabase client with the service role key for server operations
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    }
  })
}

// Mock server implementation for testing
export const serverSupabase = {
  from: (table: string) => {
    // Mock implementation for database operations
    return {
      insert: (data: any) => {
        console.log(`[Mock] Inserting into ${table}:`, data);
        // Return a successful response with a mock ID
        return {
          data: { id: 'mock-order-id-' + Date.now() },
          error: null,
          select: () => ({
            single: () => ({
              data: { id: 'mock-order-id-' + Date.now() },
              error: null
            })
          })
        };
      },
      select: (columns: string) => ({
        eq: (column: string, value: any) => ({
          single: () => ({
            data: {
              id: 'mock-order-id-' + Date.now(),
              customer_info: { firstName: 'Mock', lastName: 'Customer' },
              items: [],
              status: 'pending',
              created_at: new Date().toISOString()
            },
            error: null
          })
        })
      })
    };
  }
}; 