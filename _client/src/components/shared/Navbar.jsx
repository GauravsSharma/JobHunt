import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RiMessage2Line } from "react-icons/ri";
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoForMobile from "../../assets/logoForMobile.png"
import logo from "../../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { ReloadIcon } from "@radix-ui/react-icons"
import { MdOutlineNotifications } from "react-icons/md";

import { toast, Toaster } from "sonner";
import { logout } from '@/actions/Auth';
import MobileNav from './MobileNav';
import { setSelectedUser } from '@/features/ConversationSlice';
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge';
import { Effect } from 'react-notification-badge';
const Navbar = ({mobileNav}) => {
    const { user } = useSelector((state) => state.user);
    const { notificationCount,newMessage } = useSelector((state) => state.socket);
    const navigate = useNavigate()
    const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        setLoading(true);
        const res = await dispatch(logout());
        console.log(res);
        setLoading(false);
        if (res.error) {
            toast.error(res.payload);
            return;
        }
        dispatch(setSelectedUser(null))
        toast.success(res.payload)
        setIsDialogBoxOpen(false)
        navigate("/")
    }
    return (
        <div className='h-16 px-8 md:px-12 flex justify-between items-center w-full'>
            <Link to="/" className='flex justify-center items-center'>
                <img src={logo} alt="" className='h-10 hidden sm:block'/>
                <img src={logoForMobile} alt="" className='h-10 block sm:hidden'/>
                
                </Link>
            <ul className='hidden sm:flex justify-center h-full items-center gap-10'>      
               {
                user?.role==="recruiter"?<>
                 <NavLink to="/admin/companies" className={({ isActive }) => `flex px-1  font-semibold items-center text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >Companies</NavLink>
                 <NavLink to="/admin/jobs" className={({ isActive }) => `flex px-1  font-semibold items-center text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >Jobs</NavLink>
                </>:<>
                <NavLink to="/" className={({ isActive }) => `flex px-1  font-semibold items-center text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >Home</NavLink>
                <NavLink to="/internships" className={({ isActive }) => `flex px-1  font-semibold items-center text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >Internships</NavLink>
                <NavLink to="/jobs" className={({ isActive }) => `flex px-1  font-semibold items-center text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >Jobs</NavLink></>
               }
                <NavLink to="/faq" className={({ isActive }) => `flex px-1  font-semibold items-center text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >FAOs</NavLink>
            </ul>
            <div className='flex items-center gap-8'>
               <NavLink to="/messages"  className={({ isActive }) => `gap-1 hidden px-1  font-semibold sm:flex items-center text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >
             <div className="relative">
             <NotificationBadge
              count={newMessage}
              effect = {Effect.SCALE}
              />
               <RiMessage2Line className='text-3xl'/>
             </div>

               </NavLink>
               <NavLink to="/notifications"  className={({ isActive }) => `gap-1 px-1  font-semibold items-center flex text-sm h-full ${isActive ? 'text-blue-400 font-bold' : ''} duration-300`} >
               <div className='relative'>
                <NotificationBadge
                count={notificationCount}
                effect={Effect.SCALE}
                />
               <MdOutlineNotifications className='text-3xl'/>
               </div>
               </NavLink>
                <Popover>
                    {user && <PopoverTrigger asChild>
                        <Avatar>
                            <AvatarImage className='cursor-pointer w-full h-full object-cover' src={user?.profile?.profilePhoto?.url} alt="@shadcn" />
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>}
                    <PopoverContent className='w-72 px-4 py-4 mt-5 h-auto rounded-md  mr-5 bg-[#020021] border z-50 border-slate-800'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage className='cursor-pointer w-full object-cover' src={user?.profile?.profilePhoto?.url} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className='font-medium text-lg'>{user?.fullname}</h1>
                                <p className='text-sm text-slate-300 -mt-1'>{user?.email}</p>
                            </div>
                        </div>
                        <div className='flex flex-col '>
                           {user?.role==="student"&&<div className='mt-2 flex justify-start gap-1 items-center text-slate-300'>
                                <User2 className='text-xs' />
                                <Link to="/user/profile" className='hover:underline'>
                                    View profile
                                </Link>
                            </div>}
                            <div className={`${user?.role==="student"?"mt-2":"mt-4"} flex justify-start gap-1 items-center text-slate-300`}>
                                <LogOut />
                                <p className='cursor-pointer hover:underline'
                            onClick={() => setIsDialogBoxOpen(true)}>Logout</p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                {
                    !user && <div className='flex items-center gap-3'>
                        <Link to="/login"> <Button className="bg-white hover:bg-slate-200 text-black border-2">Login</Button></Link>
                        <Link to="/signup"><Button className="bg-blue-500 hover:bg-blue-600">Sign up</Button></Link>
                    </div>
                }
            </div>
            <Dialog open={isDialogBoxOpen} onOpenChange={setIsDialogBoxOpen}>

                <DialogContent className="sm:max-w-[425px] bg-[#020021]">
                    <DialogHeader>
                        <DialogTitle className="text-center mb-2 font-semibold">Confim <span className='text-blue-500'>logout</span></DialogTitle>
                        <DialogDescription className="text-center">
                            By clicking confirm you will be logged out.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex px-5 justify-center items-center gap-5'>
                        {loading ? <Button disabled className="w-1/2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                            : <Button className="bg-blue-500 hover:bg-blue-600 w-full"
                                onClick={handleLogOut}
                            >Confirm</Button>
                        }

                    </div>
                </DialogContent>
                <Toaster />
            </Dialog>
            <MobileNav mobileNav={mobileNav}/>
        </div>
    )
}

export default Navbar