import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Messagetxt = ({ message }) => {
  const { user } = useSelector(store => store.user);
  const isAdmin = user?._id === message?.senderId
  const scroll = useRef(null)
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])
  return (
    <div className={`flex w-full my-2 ${isAdmin ? "justify-end" : "justify-start"} items-center`} ref={scroll}>
      <div className={`bubble ${isAdmin ? "right" : "left"}`}> {message.message}</div>
    </div>

  )
}

export default Messagetxt