import { createClient } from '@supabase/supabase-js';
import { GALLERY_ITEMS } from './photographyData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isMock = !supabaseUrl || !supabaseAnonKey;

let supabaseInstance;

if (isMock) {
  if (import.meta.env.DEV) {
    console.log(
      'Supabase environment variables are missing. Falling back to a LocalStorage-backed mock client for local testing.'
    );
  }

  const getMockLeads = () => {
    const data = localStorage.getItem('mock_contact_leads');
    return data ? JSON.parse(data) : [];
  };

  const getMockPhotos = () => {
    const data = localStorage.getItem('mock_portfolio_photos');
    if (data) return JSON.parse(data);
    // Pre-populate with initial gallery items
    const defaultPhotos = GALLERY_ITEMS.map(item => ({
      id: item.id.toString(),
      title: item.title,
      category: item.category,
      image: item.image,
      location: item.location,
      shot_on: item.shotOn,
      story: item.story,
      editing_style: item.editingStyle,
      aspect: item.aspect,
      created_at: new Date().toISOString()
    }));
    localStorage.setItem('mock_portfolio_photos', JSON.stringify(defaultPhotos));
    return defaultPhotos;
  };

  const setMockPhotos = (photos) => {
    localStorage.setItem('mock_portfolio_photos', JSON.stringify(photos));
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
      if (tableName === 'portfolio_photos') {
        return {
          insert: async (records) => {
            try {
              const current = getMockPhotos();
              const newRecords = records.map(r => ({
                id: r.id || Math.random().toString(36).substring(2, 9),
                created_at: new Date().toISOString(),
                ...r
              }));
              const updated = [...newRecords, ...current];
              setMockPhotos(updated);
              return { data: newRecords, error: null };
            } catch (err) {
              return { data: null, error: err };
            }
          },
          select: (_columns = '*') => {
            return {
              order: async (column, { ascending } = {}) => {
                try {
                  const data = getMockPhotos();
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
                  const current = getMockPhotos();
                  const filtered = current.filter(r => r[column] !== value);
                  setMockPhotos(filtered);
                  return { error: null };
                } catch (err) {
                  return { error: err };
                }
              }
            };
          }
        };
      }

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

