import React, { useEffect, useState } from 'react'
import OtherUser from './OtherUser'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import Loader2 from '../shared/loader/Loader2'

const Sidebar = ({
  setIsSideBar,
  isSideBar,
  conversationLoading
}) => {
  const { contact: contacts } = useSelector(store => store.conversation)
  const { unreadMessageObj } = useSelector((state) => state.socket);
  const [filteredContact,setFilteredContact] = useState(contacts||null)
  const handleOnChange = (e) => {
    const text = e.target.value;
    if (contacts && text) {
      const filteredContact = contacts.filter((con) =>
        con.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContact(filteredContact);
    } else {
      setFilteredContact(contacts);
    }
  };
  
  useEffect(()=>{
   if(contacts){
    setFilteredContact(contacts);
   }
  },[contacts])
  
  if (conversationLoading) {
    return   <div className={`lg:w-[25%] w-full absolute top-0 ${isSideBar ? "left-0 " : "-left-full "}  sm:bg-transparent bg-[#020021] p-6 lg:static md:p-10 lg:p-5 h-full border-r shadow-xl z-20 duration-300`}>
    <Loader2/>
  </div>
  }
  return (
    <div className={`lg:w-[25%] w-full absolute top-0 ${isSideBar ? "left-0 " : "-left-full "}  sm:bg-transparent bg-[#020021] p-6 lg:static md:p-10 lg:p-5 h-full border-r shadow-xl z-20 duration-300`}>
      <div className="flex w-full mb-5">
        <Input className="bg-blue-950 border-blue-950" placeholder="Search people here..." 
        onChange = {handleOnChange}/>
      </div>
      {
        filteredContact?.map((contact) => (
          <OtherUser
            key={contact.profile._id}
            id={contact.profile._id}
            user={contact.profile}
            setIsSideBar={setIsSideBar}
            profileUrl={contact?.profile?.profile?.profilePhoto?.url}
            name={contact.profile.fullname}
            message={contact?.lastMessage?.message}
            unreadMessage={unreadMessageObj ? unreadMessageObj[contact.profile._id] : 0}
          />
        ))
      }
    </div>
  )
}

export default Sidebar