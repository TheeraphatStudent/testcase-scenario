import { collection, getDocs, addDoc, setDoc, updateDoc, doc, getDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getSessionItem } from '../useSession';

type CollectionNameTypes = 'testCases' | 'groups' | 'users';

interface DocumentProps {
  collectionName: CollectionNameTypes;
  data: any
}
interface DocumentByIdProps {
  collectionName: CollectionNameTypes;
  id: string;
}

export const getCollection = async (collectionName: CollectionNameTypes) => {
  try {

    const userId = await getSessionItem({ name: 'user' }).then((res) => res.data.uid);

    const querySnapshot = await getDocs(collection(db, collectionName, userId));
    const fetchData = querySnapshot.docs.map(doc => ({
      ...doc.data()
    }));

    return fetchData;
  } catch (error) {
    console.error(error);
    return [];

  }

}

export const createDocument = async ({
  collectionName,
  data
}: DocumentProps) => {

  const newData = {
    ...data,
    userId: getSessionItem({ name: 'user' }).then((res) => res.data.uid),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  // console.log(newData);

  const docRef = await addDoc(collection(db, collectionName), newData);
  const response = await setDoc(docRef, { id: docRef.id }, { merge: true });
  return response;

}

export const createUser = async ({
  displayName,
  email,
  photoURL,
  userId
}: {
  displayName: string | null,
  email: string | null,
  photoURL: string | null,
  userId: string | null
}) => {

  const newData = {
    displayName,
    email,
    photoURL,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  // console.log(newData);

  const docRef = await addDoc(collection(db, 'users'), newData);
  const response = await setDoc(docRef, { id: docRef.id }, { merge: true });
  return response;

}

export const updateDocument = async ({
  collectionName,
  data
}: DocumentProps) => {
  try {
    const { id, ...updateData } = data as any;
    const userId = getSessionItem({ name: 'user' }).then((res) => res.data.uid);

    const newData = {
      ...updateData,
      userId: userId,
      updatedAt: new Date().toISOString()
    }

    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, newData);
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    return false;
  }
}

export const getDocumentById = async ({
  collectionName,
  id,
}: DocumentByIdProps) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const getUserByUserId = async ({
  userId
}: { userId: string }) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user by userId:', error);
    return null;
  }
}

export const deleteDocumentById = async ({
  collectionName,
  id
}: DocumentByIdProps) => {
  try {
    const userId = getSessionItem({ name: 'user' }).then((res) => res.data.uid);
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && docSnap.data().userId === userId) {
      await deleteDoc(docRef);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}
