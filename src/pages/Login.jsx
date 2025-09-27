import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (user.loggedin==true){
      navigate('/dashboard');
    }
  }, [user.loggedin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://vvsbackend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Update user context
        setUser(result.user);
        // Navigate to dashboard instead of login!
        navigate('/dashboard'); // ✅ Fixed: Go to dashboard
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-200 w-full'>
        <div className='bg-white p-17 rounded-lg shadow-md w-100 sm:w-120'>
            <h2 className='text-2xl font-semibold mb-6 text-center'>Login</h2>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="VID"
                    name='vid' 
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input 
                    type="password" 
                    placeholder="V-Pin" 
                    name='vpin'
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-md transition-colors ${
                        loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    } text-white`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login