import React from 'react'
import { BiDonateHeart } from "react-icons/bi";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className=' flex  items-center justify-between text-white'>
        <div className=' flex items-center cursor-pointer gap-1'>

                <img src="/icons/logo-1.png" className='max-md:w-10 max-md:h-10 w-20 h-20' alt="" srcSet="" />
                <p className=' md:text-2xl font-semibold text-white text-sm  '>SahaSan</p>
            </div>
        <nav className=' flex gap-4'>
                <Link to={"/"}  className=' border-b-2 hover:border-white border-transparent '>Home</Link>
                <Link to={"/"}  className=' border-b-2 hover:border-white border-transparent'>About Us</Link>
        </nav>
        <div className=' flex items-center gap-4 '>
            <Link to={"/sign-up"} className=' md:px-2 md:py-1 px-1 py-1 max-md:text-sm hover:border-orange-500 hover:bg-transparent  hover:text-white bg-slate-200 border-[1px] text-[#e9794a]  md:rounded-full rounded-md'>
                Donate now
            </Link>
        </div>
    </header>
  )
}

export default NavBar