import { getConversation } from '@/actions/Conversation'
import Chat from '@/components/messages/Chat'
import Sidebar from '@/components/messages/Sidebar'
import { setContact, setSelectedUser } from '@/features/ConversationSlice'
import { setNewMessage, setUnreadMessageObj } from '@/features/SocketSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Messages = ({ setFooter,setMobileNav }) => {
  const [isSideBar, setIsSideBar] = useState(true);
  const { singleApplication } = useSelector(store => store.application);
  const { contact } = useSelector(store => store.conversation);
  const {unreadMessageObj} = useSelector((state) => state.socket);
  const dispatch = useDispatch()
  const { id } = useParams();
  useEffect(() => {
    const getConversations = async () => {
      await dispatch(getConversation())
      if (id) {
        const checkUserExistsInTheContact = contact.some((con)=>{
          return con.profile._id===singleApplication.applicants._id
        })
        if(!checkUserExistsInTheContact){
           dispatch(setContact([singleApplication.applicants,...contact]))
        }
      }
     
    }
    getConversations()
  }, [])
  useEffect(() => {
    if (contact) {
      // Copy the current unread message object
      const updatedUnreadMessagesCount = { ...unreadMessageObj || {} };
      contact.forEach((con) => {
        if (!(con.profile._id in updatedUnreadMessagesCount)) {
          updatedUnreadMessagesCount[con.profile._id] = 0;
        }
      });

      // Dispatch the updated unread message object to Redux
      dispatch(setUnreadMessageObj(updatedUnreadMessagesCount));
    }
  }, [contact]);
  useEffect(() => {
    setMobileNav(false)
    setFooter(false);
    dispatch(setNewMessage(0));
    return ()=>{
      setMobileNav(true)
      setFooter(true);
      dispatch(setSelectedUser(null))
    }
  }, [])
  return (
    <div className='overflow-hidden  px-3 flex justify-center items-center relative w-full h-[90vh] message' >
      {/* /sidebare */}
      <Sidebar
        setIsSideBar={setIsSideBar}
        isSideBar={isSideBar}
      />
      {/* chat */}
      <Chat
        setIsSideBar={setIsSideBar}
      />
    </div>
  )
}

export default Messages