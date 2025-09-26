import React, { useEffect } from 'react'
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if (user.loggedin==true){
      navigate('/dashboard');
    }
  }, [user.loggedin, navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-200 w-full'>
        <div className='bg-white p-17 rounded-lg shadow-md w-100 sm:w-120'>
            <h2 className='text-2xl font-semibold mb-6 text-center'>Login</h2>
            <form className='flex flex-col gap-4'>
                <input 
                    type="text" 
                    placeholder="VID"
                    name='vid' 
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input 
                    type="password" 
                    placeholder="V-Pin" 
                    name='vpin'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button 
                    type="submit"
                    className='w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer'
                >
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login