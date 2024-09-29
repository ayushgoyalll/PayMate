import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import img from '../assets/logo.svg';

const HeroSection = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    return (
        <section className="text-gray-600 body-font gradient">
            <div className="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
                <div className="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="text-2xl font-extrabold leading-9 tracking-tight mb-3 text-black sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal">
                        PayMate
                    </h1>
                    <p className="mb-8 md:pl-0 pl-2 pr-2 leading-relaxed text-black">
                        Effortless Payments, Endless Possibilities  
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate('/signin')} // Navigate to Sign In page
                            className="inline-flex text-white bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-600 rounded text-lg"
                        >
                            Sign in
                        </button>
                        <button
                            onClick={() => navigate('/signup')} // Navigate to Sign Up page
                            className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
                    <img 
                        className="object-cover object-center rounded" 
                        alt="hero" 
                        src={img} 
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
