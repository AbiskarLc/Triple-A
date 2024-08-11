import React from 'react'
import NavBar from '../Components/NavBar'
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const About = () => {
  return (
    <main className=" w-full min-h-screen flex flex-col ">
    <div className='w-full h-full bg-gradient px-2 py-2 md:px-8  '>
        <NavBar/>
        </div>
         <h1 className=" text-center font-bold max-md:text-2xl text-3xl mt-2 text-[#e9794a] ">What we do?</h1>
        <div className=" bg-gradient flex md:p-10 mt-8 md:h-[400px] p-6 max-md:flex-col max-md:gap-7">
          <p className=" text-white md:text-xl text-sm md:w-[50%] ">
          SahahaSan is a platform dedicated to reducing waste and helping those in need by connecting people who have usable items to donate with those who need them. Whether it’s food or clothes, SahahaSan makes it easy to give back to the community, ensuring that no good deed goes to waste.
          </p>
          <div className=" flex justify-center items-center">
            <img src="/icons/hands.png" className=" w-[80%] rounded-xl shadow-lg"  alt="" />
          </div>
        </div>
        <div className="flex flex-col bg-white   p-4 gap-2  md:w-full cursor-pointer md:px-10">
           
           <h1 className=" text-center font-bold max-md:text-2xl text-3xl mt-2 text-[#e9794a] ">Bussiness Partners</h1>
            
                 <div  className=" flex-1 flex  items-center justify-between max-md:flex-col max-md:gap-4 p-3">
                   <Link to={"https://www.samriddhifoundation.com"}  className="flex-1 max-md:border-2 max-md:rounded-lg max-md:w-full flex justify-center items-center p-3">
                 <img src="/icons/partner-1.png" className=" w-[150px] h-[150px] max-md:h-60" alt="" />
                   </Link>
                   <Link to={"https://www.unicef.com"} className="flex-1 max-md:border-2  max-md:rounded-lg  max-md:w-full flex justify-center items-center p-3">
                 <img src="/icons/partner-2.png" className=" w-[150px] h-[150px] max-md:h-60" alt="" />
                   </Link>
                   <Link to={"https://www.redcross.com"} className="flex-1 max-md:border-2  max-md:rounded-lg  max-md:w-full flex justify-center items-center p-3">
                 <img src="/icons/partner-3.png" className=" w-[150px] h-[150px] max-md:h-60" alt="" />
                   </Link>
                 </div>
                   
               </div>
               <div className=" flex justify-between px-10 py-3 items-center bg-gradient max-md:flex-wrap max-md:gap-3">
                      <div>
                       <img src="/icons/logo-1.png" className=" w-[200px] h-[200px] max-md:w-[100px] max-md:h-[100px]" alt="" srcSet="" />
                      </div>
                      <div className=" flex flex-col text-white">
                          <h3 className=" text-2xl font-bold max-md:text-xl">Contact</h3>
                          <div >
                              <p>Gongabu,Kathmandu,Nepal</p>
                              <p>01-4300000</p>
                              <p className=" hover:underline">info-sahasan@gmail.com</p>
                          </div>
                      </div>
                      <div className=" text-white ">
                          <h1 className=" text-2xl font-bold max-md:text-xl">Terms & policy</h1>
                          <div>
                           <p className=" hover:underline">Terms of use</p>
                           <p className=" hover:underline">Privacy policy</p>
                           <p className=" hover:underline">Donor Privacy Policy</p>
                          </div>
                      </div>
                      <div className=" flex">
                            <div onClick={()=> window.scrollTo(0,0)} className=" p-2 text-3xl cursor-pointer">
                              <FaFacebook className=" text-white"/>
                            </div>
                            <div onClick={()=> window.scrollTo(0,0)} className=" p-2 text-3xl cursor-pointer">
                              <FaInstagram className=" text-white"/>
                            </div>
                            <div onClick={()=> window.scrollTo(0,0)} className=" p-2 text-3xl cursor-pointer">
                              <FaTwitter className=" text-white"/>
                            </div>
                      </div>
               </div>
    </main>
  )
}

export default About