
import { HiOutlineMail } from "react-icons/hi";
import { MdModeEditOutline, MdOutlinePhone } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { TableDemo } from "@/components/shared/AppliedJobTable";
import { EditProfileDialogBox } from "@/components/shared/EditProfile";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAppliedJob } from "@/actions/Applications";
import Loader2 from "@/components/shared/loader/Loader2";
import { getUserById } from "@/actions/Auth";
import { ChevronLeftIcon, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/loader/Loader";
import { GoPlusCircle } from "react-icons/go";
import AddOrEditEducation from "@/components/shared/AddOrEditEducation";
import AddOrEditProjects from "@/components/shared/AddOrEditProjects";
import { Description } from "@radix-ui/react-dialog";

const Profile = () => {
  const { user: admin } = useSelector(store => store.user)
  const { socket } = useSelector(store => store.socket)
  const [educationDialogBox, setEducationDialogBox] = useState(false);
  const [projectDialogBox, setProjectDialogBox] = useState(false);
  const [loading, setLaoding] = useState(false);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null)
  const [course, setCourse] = useState(null)
  const { appliedApplications, applicationLoading } = useSelector(store => store.application)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log("project",projects);

// Debounce function to limit socket emissions
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Debounced socket emit function
const emitProfileView = debounce((userId) => {
  socket.emit("profile_view", userId);
}, 600);

const getStudent = async () => {
  setLaoding(true);
  const res = await dispatch(getUserById(id));
  setLaoding(false);
  if (res.error) {
    setUser(null);
  } else {
    setUser(res.payload);
    emitProfileView(res.payload._id);
  }
};

useEffect(() => {
  if (id) {
    getStudent();
  } else {
    setUser(admin);
    dispatch(getAppliedJob());
  }
}, [id]);

  const { projects } = user?.profile || {};
  const { education } = user?.profile || {};
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleSetCourse = (course) => {
    setCourse(course);
    setEducationDialogBox(true)
  }
  const handleSetProject = (project) => {
    setProject(project)
    setProjectDialogBox(true)
  }
  if (loading) {
    return <Loader />
  }

  return (
    <div className='profile px-5 sm:px-0 sm:mt-0 mt-5 relative flex justify-center flex-col items-center py-10'>
      <Button variant="outline" size="icon" className="bg-transparent border-2 hover:bg-slate-900 absolute -top-4 sm:top-2 z-10 sm:left-10 right-5"
        onClick={() => navigate(-1)}
      >
        <ChevronLeftIcon className="h-4 w-4 bg-transparent" />
      </Button>

      <div className="profile-info w-full sm:w-[80%] md:w-[60%] text-slate-300 p-5 border-2 border-slate-800 rounded-lg relative">
        <div className='flex justify-normal items-center gap-5'>
          <div className='h-20 w-20 overflow-hidden rounded-full'>
            <img className='h-full w-full object-cover' src={user?.profile?.profilePhoto?.url} />
          </div>
          <div>
            <h1 className='text-xl   font-semibold'>{user?.fullname}</h1>
            <p className='text-slate-300 text-sm font-medium'>{user?.profile.bio}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-start items-center gap-2 text-md font-semibold  ">
            <HiOutlineMail className="text-lg" />
            <p className="-mt-1">{user?.email}</p>
          </div>
          <div className="flex justify-start items-center gap-2 text-md font-semibold   mt-2">
            <MdOutlinePhone className="text-lg" />
            {user?.phoneNumber}
          </div>
          <div className="mt-3">
            <h1 className="font-bold text-xl">Skills</h1>
            <div className="flex justify-start items-center gap-2 mt-2">
              {
                user?.profile.skills.map((skill, i) => (
                  <Badge key={i} className={"text-md pb-1 bg-blue-500"}>{skill}</Badge>
                ))
              }
            </div>
          </div>
          <div className="mt-3">
            <h1 className="font-bold text-xl">Resume</h1>
            <a href={user?.profile?.resume?.url}> <p className="font-medium">{user?.profile?.resumeOriginalName || "resume not provided"}</p></a>
          </div>
        </div>
        {!id && <EditProfileDialogBox />}
      </div>
      <div className="w-full sm:w-[80%] md:w-[60%] p-5 border-2 border-slate-800 rounded-lg mt-5">
        <h1 className="font-bold text-xl mb-2 text-slate-300">Education</h1>
        {
          education?.map((edu) => (
            <div key={edu._id} className=" p-3 sm:p-5 border rounded-xl border-slate-600 relative">
              <h3 className="font-semibold flex justify-between flex-wrap">{edu.education_level}
                <div className="flex gap-1 sm:gap-2 sm:justify-center justify-between sm:w-auto w-full">
                  <span className="text-slate-400 text-sm">
                    {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : "currently pursuing"}
                  </span>
                 {!id && <MdModeEditOutline className="text-xl text-slate-300 cursor-pointer"
                    onClick={() => handleSetCourse(edu)}
                  />}
                </div>
              </h3>
              <h3>{edu.education_name}</h3>
            </div>
          ))
        }
        {education?.length===0&&<h1 className="text-slate-400">Education is not provided</h1>}
        {
          !id && <>
            <div className="text-blue-500 flex justify-start mt-5 gap-1 font-semibold cursor-pointer items-center"
              onClick={() => { setEducationDialogBox(true); setCourse(null) }}
            ><GoPlusCircle /> Add Education</div>
            <AddOrEditEducation
              educationDialogBox={educationDialogBox}
              setEducationDialogBox={setEducationDialogBox}
              course={course}
            />
          </>
        }
      </div>
      <div className="w-full sm:w-[80%] md:w-[60%] p-5 border-2 border-slate-800 rounded-lg mt-5">
        <h1 className="font-bold text-xl mb-2 text-slate-300">Projects</h1>
        {
          projects?.map((project) => (
            <div key={project._id} className=" p-3  sm:p-5 border rounded-xl border-slate-600 relative">
              <h3 className="font-semibold flex justify-between ">Title
               {!id && <MdModeEditOutline className="text-slate-300 text-xl cursor-pointer"
                  onClick={() => handleSetProject(project)}
                />}
              </h3>
              <h3 className="mb-2 text-slate-300">{project.title}</h3>
              <h3 className="font-semibold flex justify-between ">Description</h3>
              <h3 className="mb-2 text-slate-300">{project.description}</h3>
              <h3 className="font-semibold flex justify-between ">Github link</h3>
              <a href={project.github_link} className="text-blue-500 mb-2 break-words whitespace-normal block">{project.github_link}</a>
              <h3 className="font-semibold flex justify-between">Live link</h3>
              <a href={project.live_link} className="text-blue-500 mb-2 block">{project.live_link}</a>
            </div>
          ))
        }
         {projects?.length===0&&<h1 className="text-slate-400">Projects is not provided</h1>}
        {
          !id && <>
            <div className="text-blue-500 flex justify-start mt-5 gap-1 font-semibold cursor-pointer items-center"
              onClick={() => { setProjectDialogBox(true); setProject(null) }}
            ><GoPlusCircle /> Add Project</div>
            <AddOrEditProjects
              projectDialogBox={projectDialogBox}
              setProjectDialogBox={setProjectDialogBox}
              project={project}
            />
          </>
        }
      </div>

      {!id && <div className="w-full sm:w-[80%] md:w-[60%] p-5 border-2 border-slate-800 rounded-lg mt-5">
        <h1 className="font-bold text-xl mb-2">Applied jobs</h1>
        {applicationLoading ? <Loader2 /> : <TableDemo
          appliedApplications={appliedApplications}
        />}
      </div>}
      <Toaster />
    </div>
  )
}

export default Profile