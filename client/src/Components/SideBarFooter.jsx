import { useColorMode, Switch, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice'

const SideBarFooter = () => {

    
const {currentUser,error} = useSelector(state=>state.user)
const dispatch = useDispatch();
const { colorMode, toggleColorMode } = useColorMode()
const navigate = useNavigate();
const toast = useToast();

useEffect(()=>{

  if(error){
    toast({
      title:"Error",
      description: error,
      isClosable:true,
      status:'error'
    })
  }
 
},[error])

const handleLogOut = async () =>{

  dispatch(signOutStart());
  try {
    
    const response = await axios.delete("http://localhost:3000/api/auth/sign-out",{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials: true,
      
    });

    if(response.status === 200){
      dispatch(signOutSuccess())
      toast({
        title:"Success",
        description: response.data.message,
        isClosable:true,
        status:'success'
      })
       navigate("/")
    }
    
  } catch (error) {
     dispatch(signOutFailure(error.response.data.message));
    toast({
      title:"Error",
      description: error.response.data.message,
      isClosable:true,
      status:'error'
    })
  }
}

  return (
    <>
    <div className=" flex flex-col gap-3 ">
    {/* <div className=' flex gap-2 items-center'>
        <p className=' text-sm text-blue-500'>
            {
           colorMode === "light" ? "Dark Mode" : "Light Mode"
            }
        </p>
    <Switch id='isChecked' isChecked={colorMode==="dark"} onChange={toggleColorMode} />
    </div> */}
    <div className=' w-full flex  border-[1px] border-teal-400 p-2 gap-2 items-center rounded-md'>
       <div className=' w-10 h-10 rounded-full bg-[#F5FAFF] p-1'>
           <img src={currentUser.profilePicture} alt="app logo" srcSet="" />
       </div>
       <div className='flex-1 flex text-xs justify-between items-center '>
        <div className=' text-white'>
           <p>{currentUser.email}</p>
           <p>{currentUser.firstName+ " "+currentUser.lastName}</p>
        </div>
        <img src="/icons/logout.svg" alt="" srcSet="" className=' w-6 h-6 cursor-pointer' onClick={handleLogOut}  />
       </div>
    </div>
    <div>

    </div>
    </div>

    </>
  )
}

export default SideBarFooter