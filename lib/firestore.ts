import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const MONTHLY_TICKETS = 1000;
const DAILY_LIMIT = 50;

export async function getUserData(uid: string) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      monthlyTickets: MONTHLY_TICKETS,
      dailyUsed: 0,
      memory: {},
      lastReset: new Date().toISOString(),
    });
    return await getDoc(docRef);
  }

  return docSnap;
}

export async function useTickets(uid: string, cost: number) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return false;

  const data = userSnap.data() as any;

  // Reset daily if needed
  const lastReset = new Date(data.lastReset);
  const now = new Date();
  if (now.getDate() !== lastReset.getDate()) {
    await updateDoc(userRef, { dailyUsed: 0, lastReset: now.toISOString() });
    data.dailyUsed = 0;
  }

  if (data.dailyUsed + cost > DAILY_LIMIT || data.monthlyTickets < cost) return false;

  await updateDoc(userRef, {
    dailyUsed: data.dailyUsed + cost,
    monthlyTickets: data.monthlyTickets - cost,
  });

  return true;
}

export async function createProject(uid: string, name: string, type: string) {
  const projectsRef = collection(db, "projects");
  const docRef = await addDoc(projectsRef, {
    ownerId: uid,
    name,
    type,
    files: [],
    versions: [],
    memory: {},
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}
