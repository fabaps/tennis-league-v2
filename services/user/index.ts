import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { User } from "@/types/user";

import { getCollection } from "../db";

/**
 * The function `getUserDoc` retrieves a specific user document from a Firestore collection based on
 * the provided ID.
 * @param {string} id - The `id` parameter in the `getUserDoc` function is a string that represents the
 * unique identifier of a user document in the Firestore database.
 * @returns A `DocumentReference<DocumentData>` is being returned.
 */
const getUserDoc = async (
  id: string
): Promise<DocumentReference<DocumentData>> => {
  // DB
  const col = await getCollection("users");
  return doc(col, id);
};

/**
 * The function `getUser` retrieves user data from a Firestore collection based on the provided user
 * ID.
 * @param {string} id - The `id` parameter in the `getUser` function is a string that represents the
 * unique identifier of the user whose data you want to retrieve from the Firestore database.
 * @returns The function `getUser` is returning a Promise that resolves to either a `User` object or
 * `undefined`.
 */
export const getUser = async (id: string): Promise<User | undefined> => {
  const col = await getCollection("users");
  const userDoc = doc(col, id);

  const userData = (await getDoc(userDoc)).data() as User;
  return userData;
};

/**
 * The function `setUserProps` updates specific properties of a user document in a Firestore
 * collection.
 * @param {string} id - The `id` parameter in the `setUserProps` function is a string that represents
 * the unique identifier of a user in the database.
 * @param props - The `props` parameter in the `setUserProps` function is of type `Partial<User>`,
 * which means it is an object containing partial properties of a `User` object. This allows you to
 * update specific properties of a user without having to provide values for all properties of the
 * `User`
 * @returns The `updateDoc` function is being returned, which updates the document in the Firestore
 * database with the provided user properties.
 */
export const saveNewUser = async (props: Partial<User>): Promise<void> => {
  const col = await getCollection("users");
  const userDoc = doc(col);
  return setDoc(userDoc, props);
};

export default getUserDoc;
