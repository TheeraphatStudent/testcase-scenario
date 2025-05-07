import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setSessionItem } from "../useSession";
import { createUser, getUserByUserId } from "./useFirebaseDB";
import { DEFAULT_IMAGE } from "../../config/environment";

export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      redirect_uri: window.location.origin
    });
    
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    const userData = await getUserByUserId({
      userId: user.uid
    })

    const userObj = {
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL ?? DEFAULT_IMAGE,
      userId: user?.uid
    }

    if (!userData) {
      await createUser(userObj)  
    }

    setSessionItem({
      name: 'user',
      data: {
        ...userData,
        ...userObj
      }, 
      exp: '1d'
    });
    
    setSessionItem({
      name: 'credential',
      data: token,
      exp: '1d'
    });
    
    return { success: true, error: null };
  } catch (error) {
    console.error("Google login error:", error);
    return { success: false, error: error };
  }
};