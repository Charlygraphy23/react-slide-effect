import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getDataCollection } from '../../utils/db'
import { handlePageAnimation } from '../../utils/gsap'
import Noise from '../noise'
import Slide, { HandleSlideEvent } from '../slide'
import './style.scss'

export type Slide = {
    title : string,
    url : string,
    description?: string
}

const SlideShow = () => {
    const ref = useRef();
    const [activeIndex, setActiveIndex] = useState(0)
    const [slides , setSlides] = useState<Slide[]>([])


    const getSlides = useCallback(async () => {
        const docs = (await getDataCollection("images")) as Slide[]
        setSlides(docs)

    } , [])


    useEffect(() => {

        if (ref.current) return;

        getSlides()

        // @ts-expect-error
        ref.current = true

    })


    const handleSlides = ({ buttonEvent = 'next', nextIndex }: HandleSlideEvent) => {

        console.log({
            buttonEvent, nextIndex
        })
        const active = activeIndex;


        if (buttonEvent === 'next') {
            if (slides.length - 1 === active) {
                setActiveIndex(slides.length - 1)
                handlePageAnimation(active, slides.length)
            }
            else {
                setActiveIndex(nextIndex)
                handlePageAnimation(active, nextIndex)
            }

        }
        else {
            if (active === 0) {
                setActiveIndex(0)
                handlePageAnimation(0, -1)
            }
            else {
                handlePageAnimation(active, nextIndex)
                setActiveIndex(nextIndex)
            }

        }

    }

    return (
        <div className="slideshow__wrapper">
            <div className="slideshow">

                <section className="slide_wrapper">
                    {slides.map((payload, index) => <Slide {...payload} key={index} zIndex={slides.length - index} active={index === activeIndex} handleSlide={handleSlides} currentIndex={activeIndex} />)}
                    <Noise />
                </section>

            </div>
        </div>
    )
}

export default SlideShow