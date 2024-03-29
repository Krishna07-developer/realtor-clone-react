import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

const OAuth = () => {
  const navigate = useNavigate()
  const handleGoogleClick = async()=>{
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider)
      const user = result.user
      
      // Check User

      const docRef = doc(db,"users",user.uid);

      const docSnap =await getDoc(docRef)
      if(!docSnap.exists()){
        await setDoc(docRef,{
          name : user.displayName,
          email : user.email,
          timestamp : serverTimestamp()
        })
      }
      navigate("/")
      
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick} className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3
     uppercase text-sm font-medium hover:bg-red-800 rounded transition shadow-md hover:shadow-lg active:shadow-lg ease-in-out gap-3'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
    </button>
  )
}

export default OAuth