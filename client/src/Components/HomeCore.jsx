import React from 'react'

const HomeCore = ({title,image,text}) => {
  return (
    <div className=" border-2 border-gray-400 rounded-lg md:w-[300px] p-2 flex flex-col justify-center items-center gap-3 max-md:w-full">
    <p className=" text-center text-gray-700 font-semibold text-xl capitalize">{title}</p>
      <img src={image} alt="" className=' w-28 h-28' />
      <p className=' text-sm text-gray-700'>{text}</p>
</div>
  )
}

export default HomeCore