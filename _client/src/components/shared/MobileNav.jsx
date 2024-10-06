import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LiaHomeSolid } from "react-icons/lia";
import { LiaTelegramPlane } from "react-icons/lia";
import { RiHandbagLine, RiMessage2Line } from "react-icons/ri";
import { PiBellRingingThin } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { BsBuildingCheck } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { RiMessage3Line } from "react-icons/ri";
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge';
import { Effect } from 'react-notification-badge';
const MobileNav = ({mobileNav}) => {
    const { user } = useSelector(store => store.user)
    const { newMessage } = useSelector(store => store.socket);
    const style = "text-md font-semibold flex justify-center items-center flex-col"
    return (
   <>
      {
           mobileNav && <ul className='flex w-full z-50 sm:hidden fixed bottom-0 left-0 justify-between h-16 bg-[#010013] items-center px-5  border-t shadow-xl'>
           {user?.role === "recruiter" ? <>
               <NavLink to="/admin/companies" className={({ isActive }) => isActive ? `text-blue-500 ${style}` : `text-slate-300 ${style}`}>
                   <BsBuildingCheck className='text-2xl' />
                   Companies
               </NavLink>
               <NavLink to="/admin/jobs" className={({ isActive }) => isActive ? `text-blue-500 ${style}` : `text-slate-300 ${style}`}>
                   <BsHandbag className='text-2xl' />
                   Jobs
               </NavLink>
           </> : <>
               <NavLink to="/" className={({ isActive }) => isActive ? `text-blue-500 ${style}` : `text-slate-300 ${style}`}>
                   <LiaHomeSolid className='text-2xl' />
                   Home
               </NavLink>
               <NavLink to="/internships" className={({ isActive }) => isActive ? `text-blue-500 ${style}` : `text-slate-300 ${style}`}>
                   <LiaTelegramPlane className='text-2xl' />
                   Internships
               </NavLink>
               <NavLink to="/jobs" className={({ isActive }) => isActive ? `text-blue-500 ${style}` : `text-slate-300 ${style}`}>
                   <RiHandbagLine className='text-2xl' />
                   Jobs
               </NavLink>
           </>
           }
           <NavLink to="/messages" className={({ isActive }) => isActive ? `relative text-blue-500 ${style}` : `relative text-slate-300 ${style}`}>
              <NotificationBadge
              count={newMessage}
              effect = {Effect.SCALE}
              />
               <RiMessage2Line className='text-2xl' />
               Messages
           </NavLink>
       </ul>
      }
   </>
    )
}

export default MobileNav