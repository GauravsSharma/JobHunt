import CategoryCarousel from "@/components/shared/CategoryCarousel"
import Hero from "@/components/shared/Hero"
import JobCart from "@/components/shared/JobCart"
import LatestJob from "@/components/shared/LatestJob"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const {user} = useSelector((store)=>store.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role==="recruiter") navigate("/admin/companies")
  },[])
  return (
      <>
      <Hero/>
      <CategoryCarousel/>
      <LatestJob/>
      </>
  )
}

export default Home