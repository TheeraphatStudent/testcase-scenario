import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setSessionItem } from "../useSession";

export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    
    setSessionItem({
      name: 'user',
      data: user, 
      exp: '1d'
    });
    
    setSessionItem({
      name: 'credential',
      data: token,
      exp: '1d'
    });
    
    return { success: true, user };
  } catch (error) {
    console.error("Google login error:", error);
    return { success: false, error };
  }
};

export const logout = async () => {
  

}