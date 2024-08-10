import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import DrawerComp from '../Components/DrawerComp';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';

const Receive = () => {

  
  const {donationId} = useParams();
  const [open,setOpen] = useState(false);
  const [donor,setDonor] = useState(null) 
  const [donation,setDonation] = useState(null) 
  useEffect(() => {
    const getDonationData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/donation/getDonationById/${donationId}`, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });

        if (response.status === 200) {
          setDonation(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDonationData();
  }, [donationId]);

  // Fetch user data after donation data is fetched
  useEffect(() => {
    if (donation && donation.donorId) {
      const getUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/getUser/${donation.donorId}`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          });

          if (response.status === 200) {
            setDonor(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getUserData();
    }
  }, [donation]);
  console.log(donor)
  console.log(donation)
  return (
    <div className='relative flex max-md:flex-col'>
    <SideBar/>
    <DrawerComp open={open} setOpen={setOpen} />
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
      <section className=' relative  w-full flex min-h-screen flex-col gap-3 md:p-4 '>
            <h1 className=' text-3xl text-center text-amber-400 font-bold'>Donation Details</h1>
            <div className=' flex flex-col gap-3 shadow-xl bg-white'>
               
            </div>
      </section>
    </div>
  )
}

export default Receive