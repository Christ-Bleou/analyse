import { create } from 'zustand';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'driver' | 'admin';
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userRole: 'student' | 'driver' | 'admin' | null;
  login: (email: string, password: string, role: 'student' | 'driver' | 'admin') => Promise<void>;
  register: (data: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  userRole: null,
  //'password' is declared but its value is never read.ts(6133)
  login: async (email: string, password: string, role: 'student' | 'driver' | 'admin') => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      firstName: 'Jean',
      lastName: 'Kouassi',
      email,
      role,
    };
    
    set({ isAuthenticated: true, user: mockUser, userRole: role });
  },
  register: async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
    //'(from: number, length?: number | undefined): string' is deprecated.ts(6385)
    //lib.es5.d.ts(520, 8): The declaration was marked as deprecated here.
      id: Math.random().toString(36).substr(2, 9),
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      role: data.role || 'student',
    };
    
    set({ isAuthenticated: true, user: newUser, userRole: newUser.role });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null, userRole: null });
  },
}));
