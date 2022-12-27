import gsap from 'gsap'





export const handlePageAnimation = (i = 0, nextIndex = 1) => {
    const slides = document.querySelectorAll(".slide")
    const slideshow = gsap.timeline().add("", "basic");

    if (!slides.length) return;

    const currentSlide = generateSlideObject(slides , i)

    if (!slides[nextIndex]) return;

    const nextSlide = generateSlideObject(slides , nextIndex)

    slideshow.set(document.querySelector('.noise__wrapper') , {
        opacity : 1
    })

    slideshow.to(currentSlide.image, {
        scaleX: 2,
        scaleY: 0.8,
        duration: 0.4,
        transformOrigin: i < nextIndex  ? "100% 50%" : "0% 50%",
        opacity: 0.2,
        ease: "power1.out"
    }, "basic")
        .to(currentSlide.image, {
            x: i < nextIndex ? -1 * innerWidth : innerWidth,
            ease: "power2.out"
        }, "basic+=0.2")
        .to([...currentSlide.spans], {
            scaleY: 0.5,
            ease: "elastic.out(1, 0.3)"
        }, "basic+=0.4")
        .to([...currentSlide.spans], {
            x: i < nextIndex ? -1 * innerWidth : innerWidth,
            stagger: 0.1,
            duration: .3,
            opacity: 0
        }, "basic+=0.6")
        .set(nextSlide.image, {
            x: i < nextIndex ? innerWidth : -1 * innerWidth,
            scaleX: 1.5,
            scaleY: 0.5,
            duration: 0.3,
        }, "basic+=0.8")
        .to(nextSlide.image, {
            x: 0,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 1,
            ease: "expo.out"
        }, "basic+=1")
        .set([...nextSlide.spans], {
            x: i < nextIndex ? -100 : 100,
        }, "basic+=1")
        .set(nextSlide.title, {
            x: i < nextIndex ? -100 : 100,
        }, "basic+=1")
        .to(nextSlide.title, {
            x: 0,
            opacity: 1,
            ease: "elastic.out(1, 0.7)",
            duration : 1
        },"basic+=1.5")
        .to([...nextSlide.spans], {
            x: 0,
            opacity: 1,
            scaleX : 1,
            scaleY: 1,
        }, "basic+=1.6")
        .to(document.querySelector('.noise__wrapper'), {
            opacity: 0,
        }, "basic+=1.1")


}

export const generateSlideObject = (slides : NodeListOf<Element> , i: number) => {
    return {
        image: slides[i].querySelector("img"),
        title: slides[i].querySelector(".title"),
        spans: slides[i].querySelectorAll("span")
    }
}