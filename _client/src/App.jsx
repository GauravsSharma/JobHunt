import React, { useEffect, useState } from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { getUser, getUserProfilePhotoAndName } from './actions/Auth';
import Navbar from './components/shared/Navbar';
import Jobs from './pages/Jobs';
import Footer from './components/shared/Footer';
import Internships from './pages/Internships';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './pages/Profile';
import JobDetail from './pages/JobDetail';
import { getJobs, getLatestJobs } from './actions/Job';
import Loader from './components/shared/loader/Loader';
import Companies from './components/admin/Companies';
import AddCompany from './components/admin/AddCompany';
import EditCompany from './components/admin/EditCompany';
import AdminJobs from './components/admin/AdminJobs';
import AddOrEditCompany from './components/admin/AddOrEditCompany';
import Applicants from './components/admin/Applicants';
import Answers from './pages/Answers';
import SubmitApplication from './pages/SubmitApplication';
import SubmitApplicationSuccess from './components/shared/SubmitApplicationSuccess';
import ViewApplicants from './components/admin/ViewApplicants';
import Messages from './pages/Messages';
import io from "socket.io-client"
import { setNewMessage, setNotificationCount, setNotifications, setSocket, setUnreadMessageObjByKey } from './features/SocketSlice';
import { setMessages } from './features/ConversationSlice';
import Notifications from './pages/Notifications';
import { toast, Toaster } from 'sonner';
import { setUserNameAndProfile } from './features/AuthSlice';
import { getConversation } from './actions/Conversation';
import ScrollToTop from './components/shared/ScrollTop';
const App = () => {
  const { user, userLoading } = useSelector((state) => state.user);
  const { selectedUser } = useSelector((state) => state.conversation);
  const { notifications, notificationCount, socket, newMessage, unreadMessageObj } = useSelector((state) => state.socket);
  const { messages } = useSelector((state) => state.conversation);
  const { jobLoading } = useSelector((state) => state.job);
  const [footer, setFooter] = useState(true)
  const [mobileNav, setMobileNav] = useState(true)
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser());
    dispatch(getLatestJobs())
  }, [])



  const appRouter = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/jobs',
      element: <Jobs />,
    },
    {
      path: '/internships',
      element: < Internships />,
    },
    {
      path: '/user/profile',
      element: < Profile />,
    },
    {
      path: '/job/:jobId',
      element: < JobDetail />,
    },
    {
      path: '/job/:jobId/apply',
      element: < Answers />,
    },
    {
      path: '/job/:jobId/apply/submit-application',
      element: < SubmitApplication />,
    },
    {
      path: '/job/:jobId/apply/submit-application/success',
      element: < SubmitApplicationSuccess />,
    },
   
    //admin route
    {
      path: '/admin/companies',
      element: < Companies />,
    },
    {
      path: '/admin/jobs',
      element: < AdminJobs />,
    },
    {
      path: '/admin/jobs/create',
      element: < AddOrEditCompany />,
    },
    {
      path: '/admin/companies/create',
      element: < AddCompany />,
    },
    {
      path: '/admin/companies/:id',
      element: < EditCompany />,
    },
    {
      path: '/user/:id',
      element: < Profile />,
    },
    {
      path: '/admin/jobs/applicants/:id',
      element: < Applicants />,
    },

    {
      path: '/admin/jobs/applicants/:jobId/application/:applicationId',
      element: < ViewApplicants />,
    },

  ];
  if (userLoading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar mobileNav={mobileNav} />
      <ScrollToTop />
      <Routes>
        {appRouter.map((routes, i) => (
          <Route key={i} element={routes.element} path={routes.path} />
        ))}
      </Routes>
      {footer && <Footer />}
      <Toaster />
    </>
  );
};

export default App;
