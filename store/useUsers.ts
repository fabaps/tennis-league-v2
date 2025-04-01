import { getAllUsers } from "@/firebase/users";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// export interface User {
//   id: string;
//   name: string;
//   photo: string;
//   utr: number;
//   phone: string;
// }

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
        set({ loading: true, error: null }); // Indica que la carga ha comenzado
        try {
          const fetchedUsers = await getAllUsers();
          set({ users: fetchedUsers, loading: false }); // Actualiza las tareas y loading a false
        } catch (error) {
          console.error("Error fetching users in store:", error);
          set({
            users: [],
            loading: false,
            error: error?.message || "Failed to load users",
          }); // Maneja el error y actualiza el estado
        }
      },
    }),
    {
      name: "users-storage", // Nombre para persistir los datos
      getStorage: () => localStorage, // Usa localStorage para la persistencia
    }
  )
);

export const useUsers = () => {
  const { users, loading, error, fetchUsers } = useUsersStore();
  return { users, loading, error, fetchUsers };
};
