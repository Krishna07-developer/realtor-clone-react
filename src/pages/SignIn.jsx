import React, { useState } from 'react'
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    email : '',
    password : ''
  })
  const {email,password} = formData;
  const navigate = useNavigate()
  const handleInput = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth,email,password);
      if(userCredential.user){
        navigate("/")
      }
    } catch (error) {
      toast.error('Bad error credentials!')
    }
  }

  return (
    <section>
      <h1 className='text-3xl font-bold text-center mt-6'>SignIn</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="key" 
            className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={handleSubmit}>
            <input className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
             type="email" placeholder='Email address' id='email' value={email} onChange={handleInput}/>
            <div className='relative mb-6'>
            <input className='w-full px-4 py-2 text-xl text-gray-700'
             type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' value={password} onChange={handleInput}/>
             {showPassword ?  <AiFillEye onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/> : <AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3 text-xl cursor-pointer'/>}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p>Don't have an account?
                <Link to={'/sign-up'} className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1'>Register</Link>
              </p>
              <p>
                <Link to={'/forgot-password'} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200'>Forgot Password?</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 p-2 my-2 rounded-lg text-white text-sm 
            font-medium uppercase shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out active:bg-blue-800'>
            Sign In</button>
            <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-300
            after:border-t  after:flex-1  after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth/>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignIn