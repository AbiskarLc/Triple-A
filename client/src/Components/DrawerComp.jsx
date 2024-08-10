import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import NavItems from '../Components/NavItems'
import Header from '../Components/Header'
import { useSelector } from 'react-redux'

const DrawerComp = ({open,setOpen}) => {

  const {currentUser} = useSelector(state=>state.user);
  return (
    <Drawer
    isOpen={open}
    placement='left'
    onClose={()=> setOpen(false)}
  >
    <DrawerOverlay />
    <DrawerContent bgImage={'url(/icons/bg-img.jpg)'}>
      <DrawerCloseButton />
      <DrawerHeader>
         <Header/>
      </DrawerHeader>

      <DrawerBody className=' space-y-4'>
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
          {
            currentUser.usertype=== 'receiver' &&
            <NavItems
            item={"Receive"}
            logo={"/icons/plus.svg"}
            path={"/receive"}
          />
          }
         
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
      </DrawerBody>
    </DrawerContent>
  </Drawer>
  )
}

export default DrawerComp