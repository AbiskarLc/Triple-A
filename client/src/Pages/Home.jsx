import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import DrawerComp from "../Components/DrawerComp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  console.log(currentUser);
  return (
    <div className=" flex relative">
      <DrawerComp open={open} setOpen={setOpen} />

      <SideBar />
      <div className=" relative  w-full flex min-h-screen flex-col md:p-4 bg-[#F3F9FF]">
        <div className=" flex  justify-between md:hidden items-center p-2 shadow-md">
          <Header />
          <img
            src="/icons/hamburger.svg"
            alt=""
            srcSet=""
            onClick={() => setOpen(true)}
            className=" cursor-pointer w-6 h-6"
          />
        </div>

        <section className=" flex flex-1 flex-col p-4 bg-[#F3F9FF] gap-3 ">
          {/* <h1 className=" text-2xl  text-gray-700">Welcome, <span className=" text-amber-600 font-bold">{currentUser.firstName}</span> </h1>
            <p  className=" text-xl text-red-700 font-semibold">Support our cause, Make an impact?</p> */}
          <div className=" flex gap-2">
            <div className=" flex-1 flex shadow-xl bg-white rounded-xl   p-4 gap-5 items-center md:w-[40%] cursor-pointer">
              <img
                src={currentUser.profilePicture}
                alt="Profile Picture"
                srcSet=""
                className=" w-12 h-12 rounded-full"
              />
              <div className=" flex flex-col gap-2">
                <h1 className=" text-black text-xl  font-semibold max-md:text-sm">
                  {currentUser.firstName+ " "+ currentUser.lastName}
                </h1>
                <div>
                  <p className=" text-sm text-[#595959] flex items-center  gap-1"> <span> <img src="/icons/tickmark.png"  className=" w-4 h-4" alt="" /></span> Level 1</p>
                  <p className=" text-sm text-[#595959] flex items-center gap-1"> <span> <img src="/icons/tickmark.png"  className=" w-4 h-4" alt="" srcSet="" /></span> Rank 0</p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-white shadow-xl   rounded-xl p-4 gap-2  md:w-[40%] cursor-pointer">
              <h1 className=" text-black text-xl  font-semibold max-md:text-sm">
                Important Notifications
              </h1>
              <div className=" flex items-center gap-2">
                <img
                  src={"/icons/notify.png"}
                  alt="Profile Picture"
                  srcSet=""
                  className=" w-12 h-12 rounded-full"
                />

                <p className=" md:text-sm text-[#595959] text-xs">
                  You are updated no new notifications
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white shadow-xl   rounded-xl p-4 gap-2  md:w-full cursor-pointer">
            <div className=" flex-1 flex justify-between ">
              <h1 className=" text-black text-xl  font-semibold">
                My Donations
              </h1>
              <p className=" text text-blue-600 text-xs hover:underline">Submit a claim</p>

            </div>
              <div  className=" flex-1 flex justify-around items-center">
              <div className=" flex flex-col items-center">
                  <p className=" text-3xl text-amber-600">1</p>
                  <p className=" text-[#595959] max-md:text-sm">Successful</p>
                 </div>
              <div className=" flex flex-col items-center">
                  <p className=" text-3xl text-amber-600">2</p>
                  <p className=" text-[#595959] max-md:text-sm">Pending</p>
                 </div>
              <div className=" flex flex-col items-center">
                  <p className=" text-3xl text-amber-600">0</p>
                  <p className=" text-[#595959] max-md:text-sm">Cancellations</p>
                 </div>
              </div>
                
            </div>
          <div className="flex flex-col bg-white shadow-xl   rounded-xl p-4 gap-2  md:w-full cursor-pointer">
            <div className=" flex-1 flex justify-between ">
              <h1 className=" text-black text-xl  font-semibold">
                Bussiness Partners
              </h1>
              <p className=" text text-blue-600 text-xs hover:underline">More Info</p>

            </div>
              <div  className=" flex-1 flex  items-center justify-between max-md:flex-col max-md:gap-6 p-3">
                <Link to={"https://www.samriddhifoundation.com"}>
              <img src="/icons/partner-1.png" className=" w-[200px] max-md:h-[200px] h-auto " alt="" />
                </Link>
                <Link to={"https://www.unicef.com"}>
              <img src="/icons/partner-2.png" className=" w-[200px] max-md:h-[200px] h-auto " alt="" />
                </Link>
                <Link to={"https://www.redcross.com"}>
              <img src="/icons/partner-3.png" className=" w-[200px] max-md:h-[200px] h-[80%] " alt="" />
                </Link>
              </div>
                
            </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
