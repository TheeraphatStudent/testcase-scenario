import { collection, getDocs, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

type CollectionNameTypes = 'testCases' | 'groups';

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
}: {
  collectionName: CollectionNameTypes;
  data: unknown
}) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  const response = await setDoc(docRef, { id: docRef.id }, { merge: true });
  return response;

}