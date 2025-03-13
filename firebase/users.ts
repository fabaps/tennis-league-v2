import { db } from "@/config";
import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  photo: string;
  utr: number;
  phone: string;
  role: string;
  points: number;
}

export async function getAllUsers(): Promise<User[]> {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot: QuerySnapshot<DocumentData> = await getDocs(usersCollection);
  
      const users: User[] = [];
  
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        users.push({
          id: doc.id,
          name: userData.name || '',
          photo: userData.photo || '',
          utr: Number(userData.utr) || 0,
          phone: userData.phone || '',
          role: userData.role || 'user',
          points: Number(userData.points) || 0
        });
      });
  
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }