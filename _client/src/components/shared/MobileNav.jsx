import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LiaHomeSolid } from "react-icons/lia";
import { LiaTelegramPlane } from "react-icons/lia";
import { RiHandbagLine, RiMessage2Line } from "react-icons/ri";
import { PiBellRingingThin } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { BsBuildingCheck } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";


const MobileNav = ({mobileNav}) => {
    const { user } = useSelector(store => store.user)
    const { newMessage } = useSelector(store => store.socket);
    
    const navItemStyle = "relative flex-1 flex justify-center items-center flex-col gap-1.5 py-3 transition-all duration-500 ease-out group"
    
    return (
        <>
            {mobileNav && (
                <div className='sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md'>
                    {/* Glow effect background */}
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 
                        rounded-[32px] blur-xl opacity-60' />
                    
                    <ul className='relative flex justify-around items-center
                        backdrop-blur-[40px] bg-gradient-to-br from-white/[0.15] to-white/[0.05]
                        border border-white/[0.18]
                        rounded-[32px]
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                        overflow-hidden
                        before:absolute before:inset-0 
                        before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent 
                        before:rounded-[32px] before:pointer-events-none'>
                        
                        {/* Animated background gradient blob */}
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 
                            opacity-50 animate-pulse' />
                        
                        {user?.role === "recruiter" ? (
                            <>
                                <NavLink 
                                    to="/admin/companies" 
                                    className={navItemStyle}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {/* Active background pill */}
                                            {isActive && (
                                                <div className='absolute inset-x-3 inset-y-2 
                                                    bg-gradient-to-br from-blue-500/30 to-blue-600/20
                                                    rounded-[24px] 
                                                    shadow-[0_0_24px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                                                    border border-blue-400/30
                                                    backdrop-blur-sm
                                                    animate-[fadeIn_0.3s_ease-out]' />
                                            )}
                                            
                                            {/* Icon container */}
                                            <div className='relative z-10'>
                                                <BsBuildingCheck className={`text-[26px] transition-all duration-500 ${
                                                    isActive 
                                                        ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                                                        : 'text-white/60 group-hover:text-white/80 group-hover:scale-105'
                                                }`} />
                                            </div>
                                            
                                            {/* Label */}
                                            <span className={`relative z-10 text-[11px] font-medium tracking-wide transition-all duration-500 ${
                                                isActive 
                                                    ? 'text-white font-semibold' 
                                                    : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                Companies
                                            </span>
                                            
                                            {/* Active dot indicator */}
                                            {isActive && (
                                                <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 
                                                    bg-blue-400 rounded-full 
                                                    shadow-[0_0_12px_rgba(59,130,246,1)]
                                                    animate-[pulse_2s_ease-in-out_infinite]' />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                                
                                <NavLink 
                                    to="/admin/jobs" 
                                    className={navItemStyle}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className='absolute inset-x-3 inset-y-2 
                                                    bg-gradient-to-br from-blue-500/30 to-blue-600/20
                                                    rounded-[24px] 
                                                    shadow-[0_0_24px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                                                    border border-blue-400/30
                                                    backdrop-blur-sm
                                                    animate-[fadeIn_0.3s_ease-out]' />
                                            )}
                                            
                                            <div className='relative z-10'>
                                                <BsHandbag className={`text-[26px] transition-all duration-500 ${
                                                    isActive 
                                                        ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                                                        : 'text-white/60 group-hover:text-white/80 group-hover:scale-105'
                                                }`} />
                                            </div>
                                            
                                            <span className={`relative z-10 text-[11px] font-medium tracking-wide transition-all duration-500 ${
                                                isActive 
                                                    ? 'text-white font-semibold' 
                                                    : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                Jobs
                                            </span>
                                            
                                            {isActive && (
                                                <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 
                                                    bg-blue-400 rounded-full 
                                                    shadow-[0_0_12px_rgba(59,130,246,1)]
                                                    animate-[pulse_2s_ease-in-out_infinite]' />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink 
                                    to="/" 
                                    className={navItemStyle}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className='absolute inset-x-3 inset-y-2 
                                                    bg-gradient-to-br from-blue-500/30 to-blue-600/20
                                                    rounded-[24px] 
                                                    shadow-[0_0_24px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                                                    border border-blue-400/30
                                                    backdrop-blur-sm
                                                    animate-[fadeIn_0.3s_ease-out]' />
                                            )}
                                            
                                            <div className='relative z-10'>
                                                <LiaHomeSolid className={`text-[26px] transition-all duration-500 ${
                                                    isActive 
                                                        ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                                                        : 'text-white/60 group-hover:text-white/80 group-hover:scale-105'
                                                }`} />
                                            </div>
                                            
                                            <span className={`relative z-10 text-[11px] font-medium tracking-wide transition-all duration-500 ${
                                                isActive 
                                                    ? 'text-white font-semibold' 
                                                    : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                Home
                                            </span>
                                            
                                            {isActive && (
                                                <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 
                                                    bg-blue-400 rounded-full 
                                                    shadow-[0_0_12px_rgba(59,130,246,1)]
                                                    animate-[pulse_2s_ease-in-out_infinite]' />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                                
                                <NavLink 
                                    to="/internships" 
                                    className={navItemStyle}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className='absolute inset-x-3 inset-y-2 
                                                    bg-gradient-to-br from-blue-500/30 to-blue-600/20
                                                    rounded-[24px] 
                                                    shadow-[0_0_24px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                                                    border border-blue-400/30
                                                    backdrop-blur-sm
                                                    animate-[fadeIn_0.3s_ease-out]' />
                                            )}
                                            
                                            <div className='relative z-10'>
                                                <LiaTelegramPlane className={`text-[26px] transition-all duration-500 ${
                                                    isActive 
                                                        ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                                                        : 'text-white/60 group-hover:text-white/80 group-hover:scale-105'
                                                }`} />
                                            </div>
                                            
                                            <span className={`relative z-10 text-[11px] font-medium tracking-wide transition-all duration-500 ${
                                                isActive 
                                                    ? 'text-white font-semibold' 
                                                    : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                Internships
                                            </span>
                                            
                                            {isActive && (
                                                <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 
                                                    bg-blue-400 rounded-full 
                                                    shadow-[0_0_12px_rgba(59,130,246,1)]
                                                    animate-[pulse_2s_ease-in-out_infinite]' />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                                
                                <NavLink 
                                    to="/jobs" 
                                    className={navItemStyle}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className='absolute inset-x-3 inset-y-2 
                                                    bg-gradient-to-br from-blue-500/30 to-blue-600/20
                                                    rounded-[24px] 
                                                    shadow-[0_0_24px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                                                    border border-blue-400/30
                                                    backdrop-blur-sm
                                                    animate-[fadeIn_0.3s_ease-out]' />
                                            )}
                                            
                                            <div className='relative z-10'>
                                                <RiHandbagLine className={`text-[26px] transition-all duration-500 ${
                                                    isActive 
                                                        ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                                                        : 'text-white/60 group-hover:text-white/80 group-hover:scale-105'
                                                }`} />
                                            </div>
                                            
                                            <span className={`relative z-10 text-[11px] font-medium tracking-wide transition-all duration-500 ${
                                                isActive 
                                                    ? 'text-white font-semibold' 
                                                    : 'text-white/60 group-hover:text-white/80'
                                            }`}>
                                                Jobs
                                            </span>
                                            
                                            {isActive && (
                                                <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 
                                                    bg-blue-400 rounded-full 
                                                    shadow-[0_0_12px_rgba(59,130,246,1)]
                                                    animate-[pulse_2s_ease-in-out_infinite]' />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    )
}

export default MobileNav