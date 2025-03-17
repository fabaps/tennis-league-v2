import { db } from "@/config";
import { 
  collection, 
  DocumentData, 
  getDocs, 
  QuerySnapshot, 
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { User } from "@/types/user";
import { storage } from "@/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const USERS_COLLECTION = "users";

export async function getAllUsers(): Promise<User[]> {
  try {
    const usersCollection = collection(db, USERS_COLLECTION);
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
        category: userData.category || 'A'
      });
    });

    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    if (!userDoc.exists()) {
      return null;
    }
    const userData = userDoc.data();
    return {
      id: userDoc.id,
      name: userData.name || '',
      photo: userData.photo || '',
      utr: Number(userData.utr) || 0,
      phone: userData.phone || '',
      role: userData.role || 'user',
      // points: Number(userData.points) || 0,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      gender: userData.gender,
      // ranking: userData.ranking,
      category: userData.category
    };
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

export async function createOrUpdateUser(userId: string, userData: Partial<User>): Promise<boolean> {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Crear nuevo usuario
      await setDoc(userRef, {
        ...userData,
        role: 'user',
        points: 0,
        ranking: 0,
        createdAt: new Date().toISOString()
      });
    } else {
      // Actualizar usuario existente
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
    }
    return true;
  } catch (error) {
    console.error("Error al guardar usuario:", error);
    return false;
  }
}

export const uploadUserPhoto = async (userId: string, file: File): Promise<string> => {
  try {
    // Crear una referencia al archivo en Storage
    const storageRef = ref(storage, `users/${userId}/profile-photo`);
    
    // Subir el archivo
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Actualizar el documento del usuario con la nueva URL
    await updateDoc(doc(db, "users", userId), {
      photo: downloadURL,
      updatedAt: new Date().toISOString()
    });

    return downloadURL;
  } catch (error) {
    console.error("Error al subir la foto:", error);
    throw error;
  }
};