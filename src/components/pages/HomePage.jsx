import React from 'react'
import UserProducts from '../Products/UserProducts'
import Navbar from '../Header/Navbar';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';

const HomePage = () => {
  return (
    <div className='backgroundimg'>
      <Navbar/>
      <Banner/>
      <UserProducts/>
      <Footer/>
    </div>
  )
}

export default HomePage

