import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isMock = !supabaseUrl || !supabaseAnonKey;

let supabaseInstance;

if (isMock) {
  console.warn(
    'Supabase environment variables are missing. Falling back to a LocalStorage-backed mock client for local testing.'
  );

  const getMockLeads = () => {
    const data = localStorage.getItem('mock_contact_leads');
    return data ? JSON.parse(data) : [];
  };

  const setMockLeads = (leads) => {
    localStorage.setItem('mock_contact_leads', JSON.stringify(leads));
  };

  supabaseInstance = {
    isMock: true,
    auth: {
      getSession: async () => {
        const session = localStorage.getItem('mock_session');
        return { data: { session: session ? JSON.parse(session) : null } };
      },
      onAuthStateChange: (callback) => {
        const handleStorageChange = () => {
          const session = localStorage.getItem('mock_session');
          callback('SIGNED_IN', session ? JSON.parse(session) : null);
        };
        window.addEventListener('storage', handleStorageChange);
        
        // Initial invocation to notify listener of current state
        const initialSession = localStorage.getItem('mock_session');
        setTimeout(() => {
          callback('INITIAL_SESSION', initialSession ? JSON.parse(initialSession) : null);
        }, 0);

        return { data: { subscription: { unsubscribe: () => window.removeEventListener('storage', handleStorageChange) } } };
      },
      signInWithPassword: async ({ email, password }) => {
        if (email === 'admin@karthik.dev' && password === 'admin123') {
          const mockUser = { id: 'mock-user-id', email };
          const mockSession = { user: mockUser, access_token: 'mock-token' };
          localStorage.setItem('mock_session', JSON.stringify(mockSession));
          return { data: mockSession, error: null };
        }
        return { data: null, error: new Error('Invalid email or password. Use admin@karthik.dev / admin123') };
      },
      signOut: async () => {
        localStorage.removeItem('mock_session');
        return { error: null };
      }
    },
    from: (tableName) => {
      if (tableName !== 'contact_leads') {
        return {
          insert: async () => ({ data: null, error: new Error(`Table ${tableName} not mocked`) }),
          select: () => ({ order: async () => ({ data: [], error: null }) }),
          delete: () => ({ eq: async () => ({ error: null }) })
        };
      }

      return {
        insert: async (records) => {
          try {
            const current = getMockLeads();
            const newRecords = records.map(r => ({
              id: Math.random().toString(36).substring(2, 9),
              created_at: new Date().toISOString(),
              ...r
            }));
            const updated = [...newRecords, ...current];
            setMockLeads(updated);
            return { data: newRecords, error: null };
          } catch (err) {
            return { data: null, error: err };
          }
        },
        select: (_columns = '*') => {
          return {
            order: async (column, { ascending } = {}) => {
              try {
                const data = getMockLeads();
                data.sort((a, b) => {
                  const dateA = new Date(a[column]);
                  const dateB = new Date(b[column]);
                  return ascending ? dateA - dateB : dateB - dateA;
                });
                return { data, error: null };
              } catch (err) {
                return { data: null, error: err };
              }
            }
          };
        },
        delete: () => {
          return {
            eq: async (column, value) => {
              try {
                const current = getMockLeads();
                const filtered = current.filter(r => r[column] !== value);
                setMockLeads(filtered);
                return { error: null };
              } catch (err) {
                return { error: err };
              }
            }
          };
        }
      };
    }
  };
} else {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseInstance;

