import React from 'react'
import { Link } from 'react-router-dom'

const FormFooter = ({path, text}) => {
  return (
    <div className='flex gap-1 text-sm '>
        <p>{text}</p>
        <Link to={path} className=' text-blue-700 hover:underline'>{ path==="/sign-in"?"Log In":"Sign Up"}</Link>
    </div>
  )
}

export default FormFooter