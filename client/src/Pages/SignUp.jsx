import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorMode,
  Select,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormFooter from "../Components/FormFooter";
import FormRightSection from "../Components/FormRightSection";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { useSelector } from "react-redux";

const signUpSchema = z.object({
  firstName: z.string().min(3,{message:"Field must contain at least 3 characters"}),
  lastName: z.string().min(3,{message:"Field must contain at least 3 characters"}),
  address: z.string().min(5,{message: "Address is too short"}),
  contact: z.string().length(10,{message: "Length must be 10 characters"}).regex(/(?=98|97[\d]).{10}/,{message:"Not a valid number for region Nepal"}),
  email: z.string().regex(/^[a-zA-Z][a-zA-Z0-9]*(?:[\W]*)*[a-zA-Z0-9]*\@[a-zA-Z]{2,8}\.[a-zA-Z]{2,4}$/,{message:"Not a valid email"}),
  password: z.string().min(6,{message:"Password Must contain at least 6 characters"}),
  usertype: z.string().regex(/donor|receiver/,{message:"Please select user type"}),
})
const SignUp = () => {

  const {currentUser} = useSelector(state=>state.user)
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [type,setType] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const onsubmit = async (data) =>{

    console.log(data)
    try {
      
      const response = await axios.post("http://localhost:3000/api/auth/sign-up",
        data,
      {
        headers: {
          "Content-Type":"application/json"
        },
        withCredentials: true
      }
      );

      if(response.data){
        toast({
          title:"Error",
          description: response.data.message,
          isClosable:true,
          status:'success'
        })
        navigate('/sign-in')
      }

    } catch (error) {
      
      console.log(error);
      toast({
        title:"Error",
        description: error.response.data.message || "",
        isClosable:true,
        status:error
      })
    }
 

  }

  const onerror = () =>{

    console.log(errors)
  }

  return (
    <>
    {

      currentUser ?
      <Navigate  to={"/home"}/>: 
      <main className="flex max-md:flex-col w-full relative">
      <section className=" w-[50%] max-lg:flex-1  gap-3 max-md:w-full flex flex-col px-8 justify-center py-5">
        <Header />
        <div
          className={`${
            colorMode === "light" ? " text-gray-700" : "text-white"
          }`}
        >
          <h1 className=" text-2xl font-bold ">Sign Up</h1>
          <p className="  text-sm">Welcome to SahayogiSansar</p>
        </div>
        <form action="" className=" space-y-4" onSubmit={handleSubmit(onsubmit, onerror)}>
          <div className=" flex gap-2">
            <FormControl isInvalid={errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input type="text" {...register('firstName')}/>
              <FormErrorMessage>
                {
                  errors.firstName && errors.firstName.message
                }
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" {...register('lastName')}/>
              <FormErrorMessage>
                {
                  errors.lastName && errors.lastName.message
                }
              </FormErrorMessage>
            </FormControl>
          </div>
          <FormControl  isInvalid={errors.address}>
            <FormLabel>Address</FormLabel>
            <Input type="text" {...register('address')}/>
            <FormErrorMessage>
                {
                  errors.address && errors.address.message
                }
              </FormErrorMessage>
          </FormControl>
          <FormControl  isInvalid={errors.contact}>
            <FormLabel>Contact</FormLabel>
            <Input type="text" {...register('contact')}/>
            <FormErrorMessage>
                {
                  errors.contact && errors.contact.message
                }
              </FormErrorMessage>
          </FormControl>
          <FormControl  isInvalid={errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register('email')}/>
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormErrorMessage>
                {
                  errors.email && errors.email.message
                }
              </FormErrorMessage>
          </FormControl>
          <FormControl  isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register('password')}
              />
              <InputRightElement
                onClick={() => setShow(!show)}
                cursor={"pointer"}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage >
                {
                  errors.password && errors.password.message
                }
              </FormErrorMessage>
          </FormControl>
          <FormControl  isInvalid={errors.usertype}>
            <FormLabel>User Type</FormLabel>
            <Select name="usertype" {...register('usertype')} placeholder="Select user type" onChange={(e)=> setType(e.target.value)}>
              <option value={"donor"}>Donor</option>
              <option value={"receiver"}>Receiver</option>
            </Select>
            <FormErrorMessage>
                {
                  errors.usertype && errors.usertype.message
                }
              </FormErrorMessage>
          </FormControl>
          {
            type === 'receiver' &&
            <FormControl >
            <FormLabel>Organization Name</FormLabel>
            <Input type="text" {...register('organization')}/>
          </FormControl>
          }
          <Button
            type="submit"
             bg={'teal'}
            color={"white"}
            className=" max-md:w-full"
          >
            Submit
          </Button>
        </form>
        <FormFooter text={"Already have an Account?"} path={"/sign-in"} />
      </section>

      <FormRightSection type={'sign-up'}/>
    </main>
    }
    </>
   
  );
};

export default SignUp;
