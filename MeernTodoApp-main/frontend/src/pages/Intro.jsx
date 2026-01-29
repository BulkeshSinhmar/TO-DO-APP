import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const IntroPage = () => {
    const navigate = useNavigate();
    const introRef = useRef();
    useEffect(() => {

        gsap.from(".intro .h1", {
            y: -50,
            scale: 0.5,
            opacity: 0,
            duration: 1,
            stagger: 0.5
        });
  
        gsap.to(".intro .btn", {opacity:1, duration: 1, ease: "linear" });

    }, []);

    const handleGetStarted = () => {
        navigate('/login'); // Redirect to the main dashboard or your desired route
    };

    return (
        <div className="intro h-screen flex flex-col justify-center items-center bg-gradient-to-tl from-[red] to-[blue] text-white">
            <h1 className="h1 text-7xl font-bold mb-6">Welcome to Todo App</h1>
            <p className=" h1 text-xl text-center max-w-2xl mb-8">
                Organize your tasks, boost productivity, and stay on top of your daily goals. Start managing your todos now and make your life easier!
            </p>
            <button
                onClick={handleGetStarted}
                className="btn opacity-0 bg-white text-blue-500 font-semibold py-3 px-6 shadow-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 rounded"
            >
                Get Started
            </button>
        </div>
    );
};

export default IntroPage;
