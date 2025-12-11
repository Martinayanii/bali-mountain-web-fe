import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      
      currentUser: null, // User yang sedang login

      users: [
        { id: 1, name: "Admin Super", email: "admin@mountain.com", password: "admin", role: "admin", avatar: "https://i.pravatar.cc/150?img=68" },
        { id: 2, name: "Dimas Anggara", email: "user@gmail.com", password: "user123", role: "user", avatar: "https://i.pravatar.cc/150?img=12" }
      ],

      // --- ACTIONS ---

      login: (email, password) => {
        const user = get().users.find(u => u.email === email && u.password === password);
        if (user) {
            set({ currentUser: user });
            return { success: true, role: user.role };
        }
        return { success: false, message: "Email atau password salah!" };
      },

      register: (userData) => {
        const existingUser = get().users.find(u => u.email === userData.email);
        if (existingUser) return { success: false, message: "Email sudah terdaftar!" };

        const newUser = { 
            ...userData, 
            id: Date.now(), 
            role: "user", 
            avatar: `https://i.pravatar.cc/150?u=${userData.email}`
        };

        set((state) => ({ 
            users: [...state.users, newUser],
            currentUser: newUser 
        }));
        return { success: true };
      },

      logout: () => set({ currentUser: null }),

      updateProfile: (updatedData) => set((state) => {
        if (!state.currentUser) return state;
        const newCurrentUser = { ...state.currentUser, ...updatedData };
        const newUsers = state.users.map(u => u.email === state.currentUser.email ? newCurrentUser : u);
        return { currentUser: newCurrentUser, users: newUsers };
      }),

    }),
    {
      name: 'jejak-kaki-auth', // Kunci berbeda untuk Auth
      storage: createJSONStorage(() => localStorage),
    }
  )
);