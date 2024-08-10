import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import NavItems from "./NavItems";
import { Switch } from '@chakra-ui/react'
import Header from "./Header";
import SideBarFooter from "./SideBarFooter";
import { useSelector } from "react-redux";

const SideBar = () => {

   
  const {currentUser} = useSelector(state=>state.user);

  const location = useLocation();


  return (
    <div className=" w-[280px] sticky left-0 top-0 h-screen flex flex-col px-6 py-4 justify-between bg-[url('/icons/bg-img.jpg')] border-r-2 border-r-sky-600 max-md:hidden">
      <div className=" space-y-4">
        <Header/>
        {/* <div>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch className=" text-gray-300" />
            </InputLeftElement>
            <Input type="text" placeholder="Search" />
          </InputGroup>
        </div> */}
        <div className=" flex flex-col gap-2">
          <NavItems item={"Home"} logo={"/icons/homepng.png"} path={"/home"} />
          {
            currentUser.usertype==="donor" &&
          <NavItems
            item={"Donate"}
            logo={"/icons/donate.png"}
            path={`/donate/${currentUser._id}`}
          />
          }
          {/* {
            currentUser.usertype=== 'receiver' &&
            <NavItems
            item={"Receive"}
            logo={"/icons/plus.svg"}
            path={"/receive"}
          />
          } */}
         
          <NavItems
            item={"Donations"}
            logo={"/icons/history.png"}
            path={"/donations"}
          />
          <NavItems
            item={"Recent News"}
            logo={"/icons/news.png"}
            path={"/newsfeeds"}
          />
        </div>
      </div>
      
     <SideBarFooter/>
    </div>
  );
};

export default SideBar;
