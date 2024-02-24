import React from 'react'
import UserNavbar from '../Header/UserNavbar'
import UserProducts from '../Products/UserProducts'
import Wishlist from '../Wishlist/Wishlist';

const UserHomePage = () => {

  return (
    <div>
      <UserNavbar/>
      <UserProducts />
      <Wishlist />
    </div>
  )
}

export default UserHomePage
