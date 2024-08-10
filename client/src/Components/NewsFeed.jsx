import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import CardComp from "./CardComp";
import { SkeletonCircle, SkeletonText, useColorMode } from "@chakra-ui/react";
import Header from "./Header";
import DrawerComp from "./DrawerComp";

const NewsFeed = () => {

  const [open,setOpen] = useState(false);
    const {colorMode,toggleColorMode} = useColorMode()
  const [news, setNews] = useState([]);
  const fetchNewsData = async () => {
    try {
      const response = await axios.get(
        `https://saurav.tech/NewsAPI/top-headlines/category/health/in.json`
      );

      if (response.data) {
        setNews(response.data.articles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <div className="flex relative ">
      
      <DrawerComp open ={open} setOpen={setOpen}/>
      <SideBar />
      <section className=" flex flex-1 flex-col w-full md:p-3 gap-3">
      <div className=" flex  justify-between md:hidden items-center md:p-2 shadow-md">
          <Header />
          <img
            src="/icons/hamburger.svg"
            alt=""
            srcSet=""
            onClick={()=> setOpen(true)}
            className=" cursor-pointer w-6 h-6"
          />
        </div>
        <h1 className={`text-center md:text-3xl  text-2xl font-bold font-abc ${colorMode==='dark'?'text-white':'text-[#00214F]'} mt-5 `}>
          Global Health News
        </h1>

        {news.length > 0 ? (
          <div className=" grid md:grid-cols-3 gap-4 p-3 max-md:place-content-center max-md:w-full">
            {news.slice(0, 10).map((newsdata, index) => {
              return <CardComp news={newsdata} key={index} />;
            })}
          </div>
        ) : (
          <div className=" mx-auto w-[400px]">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </div>
        )}
      </section>
    </div>
  );
};

export default NewsFeed;
