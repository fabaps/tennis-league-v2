import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getAllUsers } from "@/firebase/users";
import { User } from "@/types/user";

interface UserStoreType {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UserStoreType>()(
  persist(
    (set) => ({
      users: [],
      loading: true,
      error: null,
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const fetchedUsers = await getAllUsers();
          set({ users: fetchedUsers, loading: false });
        } catch (error) {
          console.error("Error fetching users in store:", error);
          set({
            users: [],
            loading: false,
            error: (error as Error)?.message || "Failed to load users",
          });
        }
      },
    }),

    {
      name: "users-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUsers = () => {
  const { users, loading, error, fetchUsers } = useUsersStore();
  return { users, loading, error, fetchUsers };
};
