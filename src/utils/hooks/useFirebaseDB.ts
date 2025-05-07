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
    const userResponse = await getSessionItem({ name: 'user' });
    const userId = userResponse.data?.userId;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const fetchData = querySnapshot.docs.map(doc => ({
      ...doc.data()
    }));

    return fetchData;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return [];
  }
}

export const createDocument = async ({
  collectionName,
  data
}: DocumentProps) => {
  try {
    const userResponse = await getSessionItem({ name: 'user' });
    const userId = userResponse.data?.userId;

    const newData = {
      ...data,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    console.log(newData);

    const docRef = await addDoc(collection(db, collectionName), newData);
    const response = await setDoc(docRef, { id: docRef.id }, { merge: true });
    return response;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
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
    const userResponse = await getSessionItem({ name: 'user' });
    const userId = userResponse.data?.userId;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where('id', '==', id), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('Document not found or unauthorized');
      return false;
    }

    const docRef = doc(db, collectionName, id);
    const newData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };

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
    const userResponse = await getSessionItem({ name: 'user' });
    const userId = userResponse.data?.userId;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where('id', '==', id), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('Document not found or unauthorized');
      return false;
    }

    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}
