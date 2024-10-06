import React from 'react'
import "./loader2.css"
const Loader2 = ({className=""}) => {
  return (
    <div className={`flex justify-center items-center h-[40vh] w-full ${className}`}>
       <div className="loader2"></div>        
    </div>
  )
}

export default Loader2