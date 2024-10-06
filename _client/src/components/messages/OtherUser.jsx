import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { setSelectedUser } from '@/features/ConversationSlice'
import { useDispatch, useSelector } from 'react-redux'
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge'
import { Effect } from 'react-notification-badge'
import { setUnreadMessageObjByKey } from '@/features/SocketSlice'

const OtherUser = ({profileUrl,name,user,setIsSideBar,message,unreadMessage,id}) => {
    const {selectedUser,messages} = useSelector(store=>store.conversation)
    const dispatch = useDispatch()
    const handleSelect = ()=>{
        dispatch(setSelectedUser(user))
        dispatch(setUnreadMessageObjByKey({ count:0, senderId: id }))
        setIsSideBar(false);
    }
    console.log(unreadMessage);
    
    return (
        <div className={`w-full h-16 my-2 gap-3 flex items-center cursor-pointer hover:bg-blue-950 rounded-md px-2 ${selectedUser?._id===user._id?"bg-blue-950":"bg-transparent"}`}
        onClick={handleSelect}
        >
            <Avatar>
                <AvatarImage className='cursor-pointer w-full h-full object-cover' src={profileUrl} alt="@shadcn"/>
                <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div className={`text-slate-200 w-[60%] ${unreadMessage>0?"font-bold":"font-normal"}`}>
               {name}
                <p className='text-sm text-slate-300'>{message}</p>
            </div>
            <div className="flex justify-center items-center h-10 w-10">
                <NotificationBadge
                   count={unreadMessage}
                   effect={Effect.SCALE}
                   className={"bg-blue-950"}
                />
            </div>
        </div>
    )
}

export default OtherUser