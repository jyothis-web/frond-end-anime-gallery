import React from 'react'
import UserProducts from '../Products/UserProducts'
import Navbar from '../Header/Navbar';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import CategoryButtons from '../MovieCategory/MovieCategoryButtons/CategoryButtons';

const HomePage = () => {
  return (
    <div className='backgroundimg'>
      <Navbar/>
      <Banner/>
      <CategoryButtons/>
      <UserProducts/>
      <Footer/>
    </div>
  )
}

export default HomePage

