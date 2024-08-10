import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../Components/SideBar";
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Select,
  Radio,
  HStack,
  RadioGroup,
  Textarea,
  useToast
} from "@chakra-ui/react";
import * as z from "zod";
import { app } from "../firebase";
import DrawerComp from "../Components/DrawerComp";
import axios from "axios";

const formSchema = z.object({
  donationCategory: z.string(),
});
const Donate = () => {

  
  const [open,setOpen] = useState(false);
  const toast = useToast();
  const [downloadUrl,setDownloadURL] = useState(null)
  const [file,setFile] = useState(null)
  const { donorId } = useParams();
  const [type, setType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const uploadImage = async () =>{

    if(!file){
       return toast({
        title:"Info",
        description: "Please select image",
        isClosable:true,
        status:'info'
      })
    }

      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename)

      try {
       const totalBytes = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url);
        if(url){
          toast({
            status:'success',
            title:"Success",
            description:"Image uploaded",
            isClosable:'true'
          })
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    
  }

  const onsubmit =async (data) =>{
    data.imageUrl = downloadUrl;
    try {

      console.log(data)
      const response = await axios.post(`http://localhost:3000/api/donation/create/${donorId}`,
        data,
        {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        }
      )

      if(response.status === 200){
        toast({
          title:"Success",
          description: response.data.message,
          isClosable:true,
          status:'success'
        })
      }
    } catch (error) {

      toast({
        title:"Error",
        description: error.response.data.message,
        isClosable:true,
        status:'error'
      })
    }
  }

  console.log(downloadUrl)
  return (
    <div className=" flex">
      <DrawerComp open ={open} setOpen={setOpen}/>
      <SideBar />
      <section className=" flex flex-col flex-1 p-4  md:max-w-3xl mx-auto gap-3  ">
        <h1 className=" text-orange-500 text-3xl font-abc font-semibold">
          Donate and Make a Difference
        </h1>
        <p className=" text-sm text-sky-600">
          Fill up the form to put smile on needy face
        </p>
        <form
          action=""
          className=" space-y-4"
          onSubmit={handleSubmit(onsubmit)}
        >
          <FormControl>
            <FormLabel>Donation Category</FormLabel>
            <Select
              placeholder="Select category"
              {...register("donationCategory")}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={"Food"}>Food</option>
              <option value={"Clothes"}>Clothes</option>
              <option value={"Others"}>Others</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="text"
              {...register("quantity")}
              placeholder="Enter in kg or number of items"
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          {type === "Food" ? (
            <FormControl as="fieldset">
              <FormLabel as="legend">Condition </FormLabel>
              <RadioGroup defaultValue="Good" {...register("condition")}>
                <HStack spacing="24px">
                  <Radio value="Very Good">Very Good</Radio>
                  <Radio value="Good">Good</Radio>
                  <Radio value="Average">Average</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          ) : (
            <FormControl as="fieldset">
              <FormLabel as="legend">Condition</FormLabel>
              <RadioGroup defaultValue="Good"   {...register("condition")}>
                <HStack spacing="24px">
                  <Radio value="Very Good">Very Good</Radio>
                  <Radio value="Good">Good</Radio>
                  <Radio value="Brand New">Brand New</Radio>
                  <Radio value="used">Used Couple of Time</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
               {...register("description")}
              placeholder="Write about your donation"
              size="sm"
            />
          </FormControl>
          <div className="">
            <FormLabel>Select Image</FormLabel>
           
            <div className=" flex items-center gap-4">
            <Input type="file" onChange={(e)=> setFile(e.target.files[0]) }/>
            <Button type="button" onClick={uploadImage} disabled={!file}>
               Upload Image
            </Button>
            </div>
          </div>
          <Button
            type="submit"
            colorScheme="cyan"
            color={"white"}
            className=" max-md:w-full"
          >
            Submit
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Donate;
