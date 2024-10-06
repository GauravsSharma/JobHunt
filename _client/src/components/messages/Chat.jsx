import React, { useEffect, useReducer, useRef } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { IoMdSend } from "react-icons/io";
import Messagetxt from './Messagetxt';
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { setMessages, setSelectedUser } from '@/features/ConversationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, sendMessage } from '@/actions/Conversation';
import { FaArrowLeft } from "react-icons/fa";

import { useState } from 'react';
import Loader2 from '../shared/loader/Loader2';
const Chat = ({setIsSideBar}) => {
  const { selectedUser,messages,conversationLoading } = useSelector(store => store.conversation)
  const [message,setMessage] = useState("");
  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessages(selectedUser._id))
    }
  }, [selectedUser]
)

 const handleSubmit =async(e)=>{
   e.preventDefault();
  if(!message) return;
  const res = await dispatch(sendMessage({message,id:selectedUser._id}))
  if(res.error){
    return;
  }  
  if(messages){
    dispatch(setMessages([...messages,res?.payload]))
  }else{
    dispatch(setMessages([res?.payload]))
  }
  setMessage("")
 }

  if (!selectedUser) {
    return <div className='w-[75%] flex justify-center items-center h-full p-5'>
      <h1 className='text-slate-400 text-xl'>Start messaging by selecting people</h1>
    </div>
  }

  return (
    <div className='lg:w-[75%] w-full h-full sm:p-5 relative'>
      <div className={`w-full h-16 my-2 gap-3 flex items-center cursor-pointer hover:bg-blue-950 rounded-md px-2`}
      >
        <FaArrowLeft className='text-xl'
        onClick={()=>{dispatch(setSelectedUser(null));setIsSideBar(true)}}
        />
        <Avatar>
          <AvatarImage className='cursor-pointer w-full h-full object-cover' src={selectedUser?.profile.profilePhoto.url} alt="@shadcn" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <div className='text-slate-200 mb-3 font-bold'>
          {selectedUser?.fullname}
        </div>
      </div>
      <div className='h-[75%] px-3 sm:p-5 w-full sm:pb-0 pb-10 overflow-auto'>
       {messages?.map((message)=>(
        <Messagetxt key={message._id} message={message}/>
       ))}
       {conversationLoading&&<Loader2/>}
      </div>
      <form onSubmit={handleSubmit} className='w-full md:static absolute bottom-1 left-0 gap-2 flex justify-center items-center'>
        <Input className="w-[90%] md:w-[70%] rounded-full  bg-blue-950" placeholder="Type message..." value={message} onChange = {(e)=>setMessage(e.target.value)} />
        <div className="bg-blue-950 cursor-pointer text-white text-xl rounded-full h-12 w-12 flex justify-center items-center border">
          <IoMdSend className='ml-1' />
        </div>
      </form>
    </div>
  )
}

export default Chat