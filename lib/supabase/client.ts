import { createClient } from "@supabase/supabase-js"

// Real Supabase client - commented out for testing
// const supabaseUrl = process.env.NEXT_SUPABASE_PROJECT_URL || ""
// const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY || ""
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define types for mock data with index signatures
type MockProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  is_featured: boolean;
  slug: string;
  created_at: string;
  category_id?: string;
  image_url?: string;
  popularity?: number;
  [key: string]: any;
};

type MockCategory = {
  id: string;
  name: string;
  slug: string;
  [key: string]: any;
};

// Mock data
const mockProducts: MockProduct[] = Array(10).fill(null).map((_, i) => ({
  id: `product-${i}`,
  name: `Mock Product ${i}`,
  description: "This is a mock product for testing purposes",
  price: 19.99 + i,
  image: "/placeholder.jpg",
  image_url: "/placeholder.jpg",
  is_featured: i < 4,
  slug: `mock-product-${i}`,
  category_id: i % 2 === 0 ? 'cat-1' : 'cat-2',
  popularity: 10 - i,
  created_at: new Date().toISOString(),
  categories: { id: i % 2 === 0 ? 'cat-1' : 'cat-2', name: i % 2 === 0 ? 'Category 1' : 'Category 2', slug: i % 2 === 0 ? 'category-1' : 'category-2' }
}));

const mockCategories: MockCategory[] = [
  { id: 'cat-1', name: 'Category 1', slug: 'category-1' },
  { id: 'cat-2', name: 'Category 2', slug: 'category-2' }
];

// Helper function for case-insensitive pattern matching (like SQL ILIKE)
function ilike(str: string, pattern: string): boolean {
  // Convert the pattern to a regex by replacing % with .*
  const regex = new RegExp('^' + pattern.replace(/%/g, '.*') + '$', 'i');
  return regex.test(str);
}

// Get nested property by path like "categories.slug"
function getNestedProperty(obj: any, path: string) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Mock Supabase client for testing
export const supabase = {
  from: (table: string) => {
    // Create a query builder object with chainable methods
    let data = table === 'products' ? [...mockProducts] : [...mockCategories];
    let filtered = [...data];
    
    const queryBuilder = {
      select: (columns: string) => {
        return {
          ...queryBuilder,
          eq: (column: string, value: any) => {
            filtered = filtered.filter(item => {
              const itemValue = column.includes('.') ? getNestedProperty(item, column) : item[column];
              return itemValue === value;
            });
            return {
              ...queryBuilder,
              single: () => {
                return {
                  data: filtered.length > 0 ? filtered[0] : null,
                  error: null
                };
              },
              limit: (n: number) => {
                filtered = filtered.slice(0, n);
                return {
                  data: filtered,
                  error: null
                };
              },
              neq: (column: string, value: any) => {
                filtered = filtered.filter(item => {
                  const itemValue = column.includes('.') ? getNestedProperty(item, column) : item[column];
                  return itemValue !== value;
                });
                return {
                  ...queryBuilder,
                  limit: (n: number) => {
                    filtered = filtered.slice(0, n);
                    return {
                      data: filtered,
                      error: null
                    };
                  }
                };
              },
              data: filtered,
              error: null
            };
          },
          neq: (column: string, value: any) => {
            filtered = filtered.filter(item => {
              const itemValue = column.includes('.') ? getNestedProperty(item, column) : item[column];
              return itemValue !== value;
            });
            return {
              ...queryBuilder,
              limit: (n: number) => {
                filtered = filtered.slice(0, n);
                return {
                  data: filtered,
                  error: null
                };
              }
            };
          },
          ilike: (column: string, pattern: string) => {
            filtered = filtered.filter(item => {
              const value = item[column];
              return typeof value === 'string' && ilike(value, pattern);
            });
            return {
              ...queryBuilder,
              order: (column: string, options?: { ascending?: boolean }) => {
                return {
                  data: filtered,
                  error: null
                };
              },
              limit: (n: number) => {
                filtered = filtered.slice(0, n);
                return {
                  data: filtered,
                  error: null
                };
              },
              data: filtered,
              error: null
            };
          },
          gte: (column: string, value: any) => {
            filtered = filtered.filter(item => {
              const itemValue = item[column];
              return itemValue !== null && itemValue !== undefined && itemValue >= value;
            });
            return {
              ...queryBuilder,
              data: filtered,
              error: null
            };
          },
          lte: (column: string, value: any) => {
            filtered = filtered.filter(item => {
              const itemValue = item[column];
              return itemValue !== null && itemValue !== undefined && itemValue <= value;
            });
            return {
              ...queryBuilder,
              data: filtered,
              error: null
            };
          },
          order: (column: string, options?: { ascending?: boolean }) => {
            const ascending = options?.ascending !== false; // Default to true if not specified
            filtered.sort((a, b) => {
              const aValue = a[column];
              const bValue = b[column];
              
              if (aValue === bValue) return 0;
              if (aValue === null || aValue === undefined) return ascending ? -1 : 1;
              if (bValue === null || bValue === undefined) return ascending ? 1 : -1;
              
              return ascending 
                ? (aValue < bValue ? -1 : 1)
                : (aValue < bValue ? 1 : -1);
            });
            return {
              ...queryBuilder,
              data: filtered,
              error: null
            };
          },
          limit: (n: number) => {
            filtered = filtered.slice(0, n);
            return {
              data: filtered,
              error: null
            };
          },
          data: filtered,
          error: null
        };
      },
      insert: function(data: any) {
        return {
          data: null,
          error: null,
          select: () => ({
            data: { id: 'new-mock-id' },
            error: null,
            single: () => ({
              data: { id: 'new-mock-id' },
              error: null
            })
          })
        }
      },
      update: function(data: any) {
        return {
          data: null,
          error: null,
          eq: () => ({
            data: null,
            error: null,
            select: () => ({
              data: { id: 'updated-mock-id' },
              error: null
            })
          })
        }
      },
      delete: function() {
        return {
          data: null,
          error: null,
          eq: () => ({
            data: null,
            error: null
          })
        }
      }
    };
    
    return queryBuilder;
  },
  auth: {
    signUp: () => Promise.resolve({ data: null, error: null }),
    signIn: () => Promise.resolve({ data: null, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null })
  }
};
