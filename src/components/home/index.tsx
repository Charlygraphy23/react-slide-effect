import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './style.scss'
import gsap from 'gsap'
import { getDataCollection } from '../../utils/db';

type Profile = {
    firstName: string,
    lastName: string,
    image: string,
    instaUrl: string,
    facebookUrl: string
}

const Home = () => {
    const [backgroundUrl, setBackgroundUrl] = useState("")
    const [profile, setProfile] = useState<Profile>()
    const [loading, setLoading] = useState(false)
    const ref = useRef();

    const getInfo = useCallback(async () => {
        const [background, profile] = await Promise.all([
            getDataCollection('home'),
            getDataCollection('profile'),
        ])
        console.log("profile", profile)
        setBackgroundUrl(background[0].backgroundUrl)
        setProfile(profile[0] as Profile)
        setLoading(false)
    }, [])

    useEffect(() => {

        if (ref.current) return;
        setLoading(true)
        getInfo()

        // @ts-expect-error
        ref.current = true

    })

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            gsap.set(".avatar", {
                opacity: 0.2,
                scaleX: 0,
                scaleY: 0
            })

            gsap.set(".handle", {
                scale: 0,
                rotate: 90
            })

            gsap.set(".background--img", {
                scale: 1,
            })

            const timeline = gsap.timeline().add("", "base");

            timeline.to(".avatar", {
                opacity: 1,
            }, "base")
                .to(".avatar", {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 2,
                    ease: "elastic.out(0.8, 0.3)"
                }, "base+=0.1")
                .to([".facebook", '.instagram'], {
                    scale: 1,
                    ease: "power1.out",
                    transformOrigin: '50% 50%',
                    rotate: 0
                }, "base+=0.8")
                .to(".background--img", {
                    scale: 1.2,
                    ease: "power1.out",
                    duration: 2
                }, "base+=0.8")

        });

        return () => ctx.revert(); // cleanup

    }, [])

    return (
        <div className="home__wrapper" style={{ height: innerHeight }}>

            <div className="home">

                <div className="background background--img" style={{ backgroundImage: `url(${backgroundUrl})` }}></div>
                <div className="background background--shade"></div>


                {loading ? <h1>Loading...</h1>  : <Fragment>
                    <div className="avatar">
                        <img src={profile?.image} alt="avatar" />
                    </div>

                    <h1>{profile?.firstName + " " + profile?.lastName}</h1>

                    <div className="social_handle">
                        <a href={profile?.facebookUrl} className="handle facebook">

                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Ebene 1" viewBox="0 0 1024 1024"><path fill="#1877f2" d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z" /><path fill="#fff" d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z" /></svg>

                        </a>
                        <a href={profile?.instaUrl} target="_blank" className="handle instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <linearGradient id="a" x1="1.464" x2="14.536" y1="14.536" y2="1.464" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#FFC107" />
                                    <stop offset=".507" stopColor="#F44336" />
                                    <stop offset=".99" stopColor="#9C27B0" />
                                </linearGradient>
                                <path fill="url(#a)" d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z" />
                                <linearGradient id="b" x1="5.172" x2="10.828" y1="10.828" y2="5.172" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#FFC107" />
                                    <stop offset=".507" stopColor="#F44336" />
                                    <stop offset=".99" stopColor="#9C27B0" />
                                </linearGradient>
                                <path fill="url(#b)" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z" />
                                <linearGradient id="c" x1="11.923" x2="12.677" y1="4.077" y2="3.323" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#FFC107" />
                                    <stop offset=".507" stopColor="#F44336" />
                                    <stop offset=".99" stopColor="#9C27B0" />
                                </linearGradient>
                                <circle cx="12.3" cy="3.7" r=".533" fill="url(#c)" />
                            </svg>
                        </a>
                    </div>
                </Fragment>}
            </div>

        </div>
    )
}

export default Home