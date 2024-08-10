import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Link className=" flex items-center gap-1 cursor-pointer" to={"/"}>
          <img
            src="/icons/logo-1.png"
            alt="App Logo"
            srcSet=""
            className=" w-20 h-20 "
          />
          {/* <p className=" text-xl font-semibold text-[#00214F] p-2 ">
            <span className="bg-gradient-to-r from-orange-400 from-10% via-orange-600 via-30% to-amber-800 to-90% p-2 text-white rounded-md">
              SAHASAN
            </span>
          </p> */}
        </Link>
  )
}

export default Header