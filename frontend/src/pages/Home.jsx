import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="h-screen flex flex-col justify-between w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1586805372042-327a923a697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
            {/* Uber logo */}
            <div className="flex items-center pt-8 pl-8">
                <img
                    className="w-20 drop-shadow-lg transition-transform duration-300 hover:scale-110"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                    alt="Uber logo"
                />
            </div>

            {/* Get Started Section */}
            <div className="bg-gradient-to-t from-white via-white/90 to-white/80 shadow-lg py-8 px-10">
                <h2 className="text-4xl font-extrabold text-gray-800 text-center leading-snug mb-4">
                    Get Started with Uber
                </h2>
                <p className="text-gray-600 text-center text-sm mb-4">
                    Book rides seamlessly, anytime, anywhere.
                </p>
                <Link
                    to={'/user/login'}
                    className="flex items-center justify-center w-full bg-black text-white py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-gray-900 transition-all duration-300"
                >
                    Continue
                </Link>
            </div>
        </div>
    );
};

export default Home;
