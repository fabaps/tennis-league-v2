import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { User } from "@/types/user";

import { getCollection } from "../db";

const getUserDoc = async (
  id: string
): Promise<DocumentReference<DocumentData>> => {
  const col = await getCollection("users");
  return doc(col, id);
};

export const getUser = async (id: string): Promise<User | undefined> => {
  const col = await getCollection("users");
  const userDoc = doc(col, id);

  const userData = (await getDoc(userDoc)).data() as User;
  return userData;
};

export const saveNewUser = async (props: Partial<User>): Promise<void> => {
  const col = await getCollection("users");
  const userDoc = doc(col);
  return setDoc(userDoc, props);
};

export default getUserDoc;
