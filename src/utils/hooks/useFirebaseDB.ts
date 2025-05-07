import { collection, getDocs, addDoc, setDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

type CollectionNameTypes = 'testCases' | 'groups';
interface DocumentProps {
  collectionName: CollectionNameTypes;
  data: any
}
interface GroupProps {
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
  const docRef = await addDoc(collection(db, collectionName), data);
  const response = await setDoc(docRef, { id: docRef.id }, { merge: true });
  return response;

}

export const updateDocument = async ({
  collectionName,
  data
}: DocumentProps) => {
  try {
    const { id, ...updateData } = data as any;
    await updateDoc(doc(db, collectionName, id), updateData);
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    return false;
  }
}

export const getGroupById = async ({
  id
}: GroupProps) => {
  const docRef = doc(db, 'groups', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
