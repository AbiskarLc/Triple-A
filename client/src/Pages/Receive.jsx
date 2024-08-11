import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import DrawerComp from '../Components/DrawerComp';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import moment from 'moment';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
const Receive = () => {

  
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {currentUser} = useSelector(state=>state.user);
  const toast = useToast();
  const {donationId} = useParams();
  const navigate = useNavigate();
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

  const handleDonationAccept = async () =>{


    try {

      const response = await axios.put(`http://localhost:3000/api/donation/updateDonation/${donation._id}`,{
        receiverId: currentUser._id,
        deliveryAddress: currentUser.address
      },{
        headers:{
          "Content-Type":"application/json",
          
        },
        withCredentials:true
      })

      if(response.status === 200){

        toast({
          title:"Success",
          description:"Donation is on the way",
          status:'loading',
          isClosable:true
        })
        navigate("/donations")
      }
      
    } catch (error) {
      console.log(error);
    }
  }
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
      <section className=' relative  w-full flex min-h-screen flex-col gap-3 md:p-4 p-3 '>
            <h1 className=' text-3xl text-center text-amber-400 font-bold'>Donation Details</h1>
            <div className=' flex flex-col gap-3 shadow-xl rounded-lg bg-white p-4 border-2 border-sky-600'>
               <div className=' flex justify-between '>
                 <div className=' flex-1 flex flex-col gap-6 p-4'>
                  <h1 className=' text-gray-700 font-bold text-xl'>Donor Details</h1>
                    <p className=' text-gray-700 font-bold text-lg'> Name: <span className=' text-sky-700 font-normal text-[16px]'>{donor && donor.firstName + " " + donor.lastName}</span></p>
                    <p className=' text-gray-700 font-bold text-lg'> Address: <span className=' text-sky-700 font-normal text-[16px]'>{donor && donor.address}</span></p>
                    <p className=' text-gray-700 font-bold text-lg'> Email: <span className=' text-sky-700 font-normal text-[16px]'>{donor && donor.email}</span></p>
                    <p className=' text-gray-700 font-bold text-lg'> Contact No: <span className=' text-sky-700 font-normal text-[16px]'>{donor && donor.contact}</span></p>
                    
                 </div>
                 <div className=' flex-1 items-center flex flex-col gap-2'>
                  <h3 className=' text-gray-700 font-bold text-xl'>Donation Image</h3>
                  <img src={donation && donation.imageUrl} alt="" className=' max-md:w-[200px] w-[300px] rounded-lg min-h-[200px]' />
                 </div>
               </div>
               <hr />
               <div className=' flex flex-col p-4 gap-4'>
               <h1 className=' text-gray-700 font-bold text-xl'>Donation Data</h1>
                    <p className=' text-gray-700 font-bold text-lg'> Id: <span className=' text-sky-700 font-normal text-[16px]'>{donation && donation._id}</span></p>
                    <p className=' text-gray-700 font-bold text-lg'> Category: <span className=' text-sky-700 font-normal text-[16px]'>{donation && donation.donationCategory}</span></p>
                    {
                     donation &&     donation.donationCategory === "Food" ?
                      <p className=' text-gray-700 font-bold text-lg'> Quantity: <span className=' text-sky-700 font-normal text-[16px]'>{donation && donation.quantity}&nbsp;kg</span></p> :
                      <p className=' text-gray-700 font-bold text-lg'> Quantity: <span className=' text-sky-700 font-normal text-[16px]'>{donation && donation.quantity}</span></p>

                    }
                    
                    <p className=' text-gray-700 font-bold text-lg'> Category: <span className=' text-sky-700 font-normal text-[16px]'>{donation && donation.condition}</span></p>
                    <p className=' text-gray-700 font-bold text-lg'>Posted Time: <span className=' text-sky-700 font-normal text-[16px]'>{donor && moment(donation.createdAt).fromNow()}</span></p>
               </div>
               <hr />
               <div className=' flex gap-4'>
                   <Button  bg={'green'} color={'white'} onClick={onOpen}>
                       Confirm
                   </Button>
                   <Button bg={'red'} color={'white'} onClick={()=> navigate("/donations")}>
                       Cancel
                   </Button>
               </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ready to get Donation?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <p className=' text-red-600 text-sm '>
                  After confirmation please contact the donor for donation. For Delivery, you can send your own person or wait for our volunteers.
                </p>
          </ModalBody>
            
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='solid' colorScheme='green' onClick={handleDonationAccept}>Accept</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </section>
    </div>
  )
}

export default Receive