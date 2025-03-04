import type {
  CollectionReference,
  DocumentData,
  Firestore,
} from "@firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";

import app from "@/config";

let globalDB: Firestore | null = null;

/**
 * The function `getFirestoreDB` asynchronously retrieves the Firestore database instance.
 * @returns The `getFirestoreDB` function returns a Promise that resolves to a Firestore database
 * instance.
 */
const getFirestoreDB = async (): Promise<Firestore> => {
  // DATABASE
  globalDB = globalDB ?? getFirestore(app);
  return globalDB;
};

/**
 * The function `getCollection` asynchronously retrieves a reference to a Firestore collection based on
 * the provided collection name.
 * @param {string} colName - The `colName` parameter is a string that represents the name of the
 * collection you want to retrieve from the Firestore database.
 * @returns A `CollectionReference<DocumentData>` is being returned.
 */

export const getCollection = async (
  colName: string
): Promise<CollectionReference<DocumentData>> =>
  // COLLECTION
  collection(await getFirestoreDB(), colName);

export default getFirestoreDB;
