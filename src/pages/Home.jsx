import React, { useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import Banner from '../components/Home/Banner';
import Why from '../components/Home/Why';

const Home = () => {

    const {user} = useUserContext();

    // useEffect(()=>{
    //     console.log(user);
    // }, [])
  
    return (
    <div className=''>
      <Banner />
      <Why />
    </div>
  )
}

export default Home