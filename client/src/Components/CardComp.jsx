import React from 'react'
import { Card, CardHeader, CardBody, Stack, Heading,Text, CardFooter, Divider, Button, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const CardComp = ({news}) => {
    console.log(news)
  return (
    <Card maxW='xs' cursor={'pointer'} >
  <CardBody>
    <img
      src={news.urlToImage}
      alt={news.title}
      className=' w-full rounded-lg'
    />
   <div className=' relative flex flex-col gap-2 mt-3'>
       <h3 className=' text-[16px] font-semibold'>Title: {news.title.slice(0,30)+"...."}</h3>
       <p className=' text-sm text-teal-500'>
        {
            news.description
        }
       </p>
   </div>
  </CardBody>
  <CardFooter>
    
  <Button className=' absolute bottom-0'>
        <Link to={news.url} target='_blank'>
        Read More
        </Link>
        </Button>
  </CardFooter>
   
</Card>
  )
}

export default CardComp