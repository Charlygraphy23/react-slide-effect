import  { useLayoutEffect } from 'react'
import './style.scss'
import gsap from 'gsap'
import { generateSlideObject } from '../../utils/gsap'

type Props = {
  url : string,
  title : string,
  zIndex : number,
  active : boolean,
  handleSlide : (args : HandleSlideEvent) => void , 
  currentIndex : number
}

export type HandleSlideEvent = {buttonEvent : 'next' | 'prev' , nextIndex : number}

const Slide = ({url , title , zIndex ,active , handleSlide , currentIndex} : Props) => {


  useLayoutEffect(() => {
    const slides = document.querySelectorAll(".slide")


     
  // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
  const ctx = gsap.context(() => {

    const firstSlide = generateSlideObject(slides , 0)
  
    
    gsap.set(firstSlide.image , {
        opacity : 1
    })

    gsap.set(firstSlide.title , {
      opacity : 1
    })

    gsap.set([...firstSlide.spans] , {
      opacity : 1
    })
    
  }); 
  
  return () => ctx.revert(); // cleanup

  } , [])

  return (
    <div className={active ? "slide active" : "slide"} style={{zIndex : zIndex}}>
        <img src={url} alt="slide-images" />
        <h1 className="title">
        {title.split("").map((letter , i) => <span key={i+"span"}>{letter}</span>)}
        </h1>

         <div className="button__wrapper">
                <button className="btn btn--next" onClick={() => {
                  handleSlide({buttonEvent : 'next' , nextIndex : currentIndex + 1})
                }}>Next</button>
                <button className="btn btn--prev" onClick={() => {
                  handleSlide({buttonEvent : 'prev' , nextIndex : currentIndex - 1})
                }}>Prev</button>
            </div>
    </div>
  )
}

export default Slide