import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { setNotificationCount } from '@/features/SocketSlice';
import { AvatarImage } from '@radix-ui/react-avatar';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner';

const Notifications = () => {
    const {socket,notifications} = useSelector(store=>store.socket);
    const dispatch = useDispatch()
    useEffect(()=>{
      
     dispatch(setNotificationCount(0))
    },[])
  return (
    <div className='md:px-20 py-10 sm:px-10 px-5 min-h-screen w-full flex justify-center items-start'>
       <div className='md:w-1/2 w-full p-5  shadow-xl'>
       <h1 className='text-3xl font-bold mb-10'>Notifications</h1>
       <div className='mt-5'>
       {
        notifications?.map((notification)=>{
          return  <div className={`w-full h-16 my-2 gap-3 flex items-center cursor-pointer hover:bg-blue-950  px-4 bg-cyan-950 shadow-lg rounded-lg`}
            >
               {notification.type!=="status_changed" && <Avatar>
                    <AvatarImage className='cursor-pointer w-full h-full object-cover' src={notification.data.url} alt="@shadcn"/>
                    <AvatarFallback>DP</AvatarFallback>
                </Avatar>}
                <div className='text-slate-200'>
                   { notification.type==="profile_view"&&<p className='text-sm text-slate-300'>{notification.data.fullname} viewed your profile.</p>}{notification.type==="incoming_message"&&<p className='text-sm text-slate-300'>New message from {notification.data.fullname}.</p>}
                   {notification.type==="status_changed" && <p className='text-sm text-slate-300'>Your application is {notification.data}.</p>}
                </div>
            </div> 
        })
      }
      {notifications.length===0 && <h1 className='text-slate-500 font-bold text-xl text-center'>No notifications</h1>}
       </div>
      
       </div>
    </div>
  )
}

export default Notifications