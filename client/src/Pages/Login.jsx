import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorMode,
  useToast
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormFooter from "../Components/FormFooter";
import FormRightSection from "../Components/FormRightSection";
import { useForm } from "react-hook-form";
import { userContext } from "../Context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

const Login = () => {

  const dispatch = useDispatch()
   const {currentUser} = useSelector(state=>state.user)
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm()

  const onsubmit = async (data) =>{


    try {
       dispatch(signInStart());
      const response = await axios.post("http://localhost:3000/api/auth/sign-in",data,
        {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
        }
      );

      if(response.status === 200){
        dispatch(signInSuccess(response.data.rest));
        console.log(response.data)
        toast({
          title:"Success",
          description: response.data.message,
          isClosable:true,
          status:'success'
        })
        navigate("/home")
      }
      
    } catch (error) {

      
      console.log(error);
      toast({
        title:"Failed",
        description: error.response.data.extraDetails,
        isClosable:true,
        status:'error'
      })
       
    }
  }

  const { colorMode, toggleColorMode } = useColorMode()
  const [show,setShow] = useState(false)


  return (

    <>
     {
currentUser ?
  <Navigate to={"/home"}/>:
  <main className="flex max-md:flex-col h-screen w-full ">
  <section className=" w-[50%] max-lg:flex-1  gap-3 max-md:w-full flex flex-col px-8 justify-center">
    <Header />
    <div className={`${colorMode==='light'?" text-gray-700":"text-white"}`}>
      <h1 className=" text-2xl font-bold ">Log In</h1>
      <p className="  text-sm">
        Welcome Back, Please Enter your Details
      </p>
    </div>
    <form action="" className=" space-y-4" onSubmit={handleSubmit(onsubmit)}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register('email')} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {
              ...register('password')
            }
          />
          <InputRightElement  onClick={ ()=> setShow(!show)} cursor={'pointer'}>
             {
              show? <FaEyeSlash/>: <FaEye/>
             }
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button type="submit" colorScheme="cyan" color={"white"} className=" max-md:w-full">Submit</Button>
    </form>
    <FormFooter text={"Don't Have an Account?"} path={"/sign-up"}/>
  </section>
 <FormRightSection type="sign-in"/>
</main>
}
   
     
    </>
  );
};

export default Login;
