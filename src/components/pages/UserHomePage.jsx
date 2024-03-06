import React from 'react'
import UserNavbar from '../Header/UserNavbar'
import UserProducts from '../Products/UserProducts'
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import CategoryButtons from '../MovieCategory/MovieCategoryButtons/CategoryButtons';

const UserHomePage = () => {

  return (
    <div className='backgroundimg'>
      <UserNavbar/>
      <Banner/>
      <CategoryButtons/>
      <UserProducts />
      <Footer/>
    </div>
  )
}

export default UserHomePage
