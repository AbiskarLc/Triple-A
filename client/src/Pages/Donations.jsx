import React, { useContext, useEffect, useState } from "react";
import SideBar from '../Components/SideBar'
import DrawerComp from "../Components/DrawerComp";
import DonationCard from "../Components/DonationCard";
import axios from "axios";
import { SkeletonCircle, SkeletonText, useToast } from "@chakra-ui/react";

const Donations = () => {
  
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [donations,setDonations] = useState([]);
  useEffect(()=>{

    const getAllDonations = async () =>{

      try {
        
        const response = await axios.get(`http://localhost:3000/api/donation/getAllDonations`,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        });

        if(response.status === 200){
               setDonations(response.data);
        }

      } catch (error) {
        
        console.log(error);
        toast({
          title:"Error",
          description:  "Failed to get Donations",
          status:'error'
        })
      }
    }

    
  getAllDonations()
  },[])

  return (
    <div className=' flex relative '>
      <SideBar/>
      <DrawerComp open={open} setOpen={setOpen} />
      <section className=" relative  w-full flex min-h-screen flex-col gap-3 md:p-4 bg-[#F3F9FF]">
      <h1 className=" text-3xl font-bold text-[#e9794a] text-center">Available Donations</h1>
        {
          donations.length > 0 ?
          donations.map((data,index)=>{

           return <DonationCard key={index} donation={data}/>
          }) :
          <div className=" mx-auto w-[400px]">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </div>
          
        }
      </section>
    </div>
  )
}

export default Donations