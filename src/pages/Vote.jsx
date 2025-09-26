import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Vote = () => {

  const [elections, setElections] = useState([{name:'Headgirl Election', candidates:['Simran Tiwari', 'Ritika']}, {name:'Sports Captain Election', candidates:['Sota Bheem', 'Kirmada']}, {name:'Cultural Secretary Election', candidates:['Dhruv Rathee', 'Elvish Yadav']}, {name:'Class 2nd Monitor', candidates:['Naira ki poti Naira', 'Thecha']}, {name:'Nursery Monitor', candidates:['Guru Randhawa', 'Kaalia']}, {name:'Kindergarten Monitor', candidates:['Badshah', 'Mighty Raju']}]);
  const [dialog, setDialog] = useState({shown:false, data:{name:'', candidates:[]}});

  const {user} = useUserContext();
  const navigator = useNavigate();

  useEffect(()=>{
    if (!user.loggedin || user.role != 'voter'){
      navigator('/login');
    }
  }, [user, navigator]);

  return (
    <div className='min-h-screen p-4'>
      <div className='bg-zinc-700 p-10 rounded-md shadow-md'>
        <h1 className='text-white text-3xl'>Available Elections</h1>

        <div className='mt-4'>
          {elections.map((elec, idx) => (
            <div key={idx} className='bg-zinc-300 p-4 rounded-md mb-3 flex justify-between items-center'>
              <span className='text-xl font-medium'>{elec.name}</span>
              <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700' onClick={() => setDialog({shown:true, data:elec})}>Vote Now</button>
            </div>
          ))}
        </div>
      </div>

      {dialog.shown && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-md w-11/12 md:w-1/2 lg:w-1/3'>
            <h2 className='text-2xl mb-4'>{dialog.data.name}</h2>
            <div className='flex flex-col gap-3 max-h-60 overflow-y-auto'>
              {dialog.data.candidates.map((cand, idx) => (
                <div key={idx} className='flex items-center gap-3'>
                  <input type="radio" name="candidate" id={`cand-${idx}`} className='w-5 h-5' />
                  <label htmlFor={`cand-${idx}`} className='text-lg'>{cand}</label>
                </div>
              ))}
            </div>
            <div className='mt-6 flex justify-end gap-3'>
              <button className='bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500' onClick={() => setDialog({shown:false, data:{name:'', candidates:[]}})}>Cancel</button>
              <button className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700' onClick={() => { alert('Vote submitted!'); setDialog({shown:false, data:{name:'', candidates:[]}});  }}>Submit Vote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vote