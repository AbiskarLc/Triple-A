import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DonationCard = ({ donation }) => {

  const {currentUser}= useSelector(state=>state.user);
  const [user,setUser] = useState(null);
  const { donationCategory, _id, status, pickUpAddress,donorId } = donation;
  const navigate = useNavigate();
  useEffect(()=>{
  const getUserData = async () =>{

    try {
      const response = await axios.get(`http://localhost:3000/api/user/getUser/${donorId}`,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })

      if(response.status === 200){

        setUser(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  getUserData();

},[donation])

  return (
    <div className=" flex p-3 shadow-lg bg-white flex-col  rounded-xl ">
      <div className=" flex justify-between items-center">
        <p className=" text-[#595959] text-[16px] font-bold">
          Donor Name: <span className=" text-teal-600 text-sm">{user && user.firstName + " "+ user.lastName}</span>
        </p>
    
        <div className=" flex p-1 rounded-2xl items-center gap-1 border-sky-600 border-2  ">
          <img
            src={ donationCategory ==="food"?"/icons/food-icon.png":"/icons/clothes.png"}
            className=" w-8 h-8 rounded-full"
            alt=""
          />
          <p className=" text-sm text-teal-700 cursor-pointer">{
donationCategory === "food"?
"Food": "Clothes"}</p>
        </div>
      </div>
      <p className=" text-[#595959] text-[16px] font-bold">
        Donation Id: <span className=" text-sky-600 text-sm">{_id}</span>
      </p>
      <div className=" flex justify-between items-center">
        <p className=" text-[#595959] text-[16px] font-bold">
          Pick Up Address:
          <span className=" text-sky-600 text-sm">{" "+pickUpAddress}</span>
        </p>
        <div
          className={` flex p-1 rounded-xl items-center gap-1 ${
            status === "available" ? "border-green-600" : "border-gray-600"
          } border-2  `}
        >
          <p className=" text-sm text-teal-700 cursor-pointer">
            {status === "available" ? "Available" : "Pending"}
          </p>
        </div>
      </div>
        {
          currentUser.usertype === 'receiver' &&
         (
          <Button className=" mt-2 "  color={'white'}  bg={'#ff6d1b'} onClick={()=> navigate(`/receive/${_id}`)}>
          Receive
       </Button>
         )
        }
    </div>
  );
};

export default DonationCard;
