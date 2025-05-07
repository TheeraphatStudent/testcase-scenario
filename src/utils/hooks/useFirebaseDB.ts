import { collection, getDocs, addDoc, setDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
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
    const querySnapshot = await getDocs(collection(db, collectionName));
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
    userId: getSessionItem({ name: 'user' }).data.uid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  console.log(newData);

  const docRef = await addDoc(collection(db, collectionName), newData);
  const response = await setDoc(docRef, { id: docRef.id }, { merge: true });
  return response;

}

export const updateDocument = async ({
  collectionName,
  data
}: DocumentProps) => {
  try {
    const { id, ...updateData } = data as any;
    const userId = getSessionItem({ name: 'user' }).data.uid;

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
  id
}: DocumentByIdProps) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const deleteDocumentById = async ({
  collectionName,
  id
}: DocumentByIdProps) => {
  try {
    const userId = getSessionItem({ name: 'user' }).data.uid;
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
