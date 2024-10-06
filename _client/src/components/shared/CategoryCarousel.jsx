import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
const CategoryCarousel = () => {
  const navigate = useNavigate()
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "DevOps Science",
    "Fullstack Developer",
    "Graphics Designer",
  ]
  const handleClick = (category) => {
    if (category.includes("intern")) {
      navigate(`/internships?keyword=${category.split(" ")[0].toLowerCase()}`)
    }
    else {
      navigate(`/jobs?keyword=${category.split(" ")[0].toLowerCase()}`)
    }
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-[70%] sm:max-w-xl mx-auto my-10">
      <CarouselContent>
        {
          category.map((cat, idx) => (
            <CarouselItem key={idx} className=" text-center md:basis-1/2 lg:basis-1/3
                    
                    ">
              <Button variant="outline" className="rounded-full bg-transparent"
                onClick={() => handleClick(cat)}
              >{cat}</Button>
            </CarouselItem>
          ))
        }

      </CarouselContent>
      <CarouselPrevious className="bg-transparent" />
      <CarouselNext className="bg-transparent" />
    </Carousel>
  )
}

export default CategoryCarousel