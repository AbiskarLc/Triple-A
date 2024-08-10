import { useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavItems = ({ logo, item , path}) => {


    const { colorMode, toggleColorMode } = useColorMode()
    const [isActive,setIsActive] = useState(false)
    const {pathname} = useLocation();
     
  useEffect(()=>{

    setIsActive(pathname === path)
  },[])  
    

  return (
    <Link className={`flex w-[248px] h-[56px] max-md:text-white ${colorMode==='dark' && !isActive? "text-white hover:text-gray-700": " text-white"}  items-center gap-2 cursor-pointer ${!isActive?"hover:bg-gray-100 hover:text-black":"bg-[#c95639]  text-white hover:text-white"} rounded-md py-4 px-3 `}  to={path}>
      <img src={logo} alt={`${item} icon`} className=" w-6 h-6" />
      <p className=" text-[16px] ">{item}</p>
    </Link>
  );
};

export default NavItems;
