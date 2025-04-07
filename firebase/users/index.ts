import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "@/config";
import { User, USER_ROLE } from "@/types/user";

const USERS_COLLECTION = "users";

export async function getAllUsers(): Promise<User[]> {
  try {
    const usersCollection = collection(db, USERS_COLLECTION);
    const usersSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      usersCollection
    );

    const users: User[] = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        name: userData.name || "",
        picture: userData.picture || "",
        utr: Number(userData.utr) || 0,
        phone: userData.phone || "",
        role: userData.role || USER_ROLE.PLAYER,
        category: userData.category || "A",
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
      name: userData.name || "",
      picture: userData.picture || "",
      utr: Number(userData.utr) || 0,
      phone: userData.phone || "",
      role: userData.role || USER_ROLE.PLAYER,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      gender: userData.gender,
      category: userData.category,
    } as User;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

export async function createOrUpdateUser(
  userId: string,
  userData: Partial<User>
): Promise<boolean> {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        ...userData,
        utr: 0,
        points: 0,
        role: USER_ROLE.PLAYER,
        createdAt: new Date().toISOString(),
      });
    } else {
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString(),
      });
    }
    return true;
  } catch (error) {
    console.error("Error al guardar usuario:", error);
    return false;
  }
}

export const uploadUserPicture = async (
  userId: string,
  file: File
): Promise<string> => {
  try {
    const storageRef = ref(storage, `users/${userId}/profile-picture`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await updateDoc(doc(db, "users", userId), {
      picture: downloadURL,
      updatedAt: new Date().toISOString(),
    });

    return downloadURL;
  } catch (error) {
    console.error("Error al subir la foto:", error);
    throw error;
  }
};
