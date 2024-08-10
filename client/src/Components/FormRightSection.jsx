import { useColorMode } from '@chakra-ui/react';
import React from 'react'


const FormRightSection = ({type}) => {

    
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <section
    className={`w-[50%] max-lg:hidden h-screen flex items-center  fixed right-0 bg-gradient`}
  >
    <div className={`flex justify-center items-center flex-1  pl-6 flex-col ${type==='sign-in'?"pt-20":""}`}>
        <h1 className={` text-[52px] font-bold text-white`}>Welcome to <br /> Sahayogi Sansar</h1>
         <img src="/icons/logo-2.png" alt="" srcSet="" className=" w-[400px] h-[400px] animate-bounce  mt-8 duration-500  " />
    </div>
  </section>
  )
}

export default FormRightSection