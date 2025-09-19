import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from "zustand";
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLaoding: boolean;
  setisAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
  fetchAuthenticatedUser: () => Promise<void>;
};
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLaoding: false,
  setisAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsLoading: (value) => set({ isLaoding: value }),
  setUser: (user) => set({ user }),
  fetchAuthenticatedUser: async () => {
    set({ isLaoding: true });
    try {
      const user = await getCurrentUser();
      if (user) {
        set({ isAuthenticated: true, user: user as unknown as User });
        return
      }
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLaoding: false });
    }
  },
}));

export default useAuthStore;
