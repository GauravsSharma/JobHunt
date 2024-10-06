import React from 'react'
import OtherUser from './OtherUser'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import Loader2 from '../shared/loader/Loader2'

const Sidebar = ({
  setIsSideBar,
  isSideBar,
}) => {
  const { contact: contacts,conversationLoading } = useSelector(store => store.conversation)
  const {unreadMessageObj} = useSelector((state) => state.socket);
  if(conversationLoading){
    return <Loader2 className="lg:w-[25%]"/>
  }
  return (
    <div className={`lg:w-[25%] w-full absolute top-0 ${isSideBar?"left-0 ":"-left-full "}  sm:bg-transparent bg-[#020021] p-6 lg:static md:p-10 lg:p-5 h-full border-r shadow-xl z-20 duration-300`}>
      <div className="flex w-full mb-5">
        <Input className="bg-blue-950 border-blue-950" placeholder="Search people here..." />
      </div>
      {
        contacts?.map((contact) => (
          <OtherUser
            key={contact.profile._id}
            id={contact.profile._id}
            user={contact.profile}
            setIsSideBar={setIsSideBar}
            profileUrl={contact?.profile?.profile?.profilePhoto?.url}
            name={contact.profile.fullname}
            message = {contact?.lastMessage?.message}
            unreadMessage = {unreadMessageObj?unreadMessageObj[contact.profile._id]:0}
          />
        ))
      }
    </div>
  )
}

export default Sidebar