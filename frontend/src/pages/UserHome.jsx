import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { FaArrowDown } from "react-icons/fa";

const UserHome = () => {
  const [formData, setFormData] = useState({ location: "", destination: "" });
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', duration: 0.5 })
    } else {
      gsap.to(panelRef.current, { height: '0%', duration: 0.5 })
    }
  }, [panelOpen])

  return (
    <div className="relative h-screen flex flex-col justify-between w-full bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1672097247804-add051dcd682?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
      {/* Uber Logo */}
      <Link to="/" className="absolute top-8 left-8">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber logo"
          className="w-20 drop-shadow-lg transition-transform duration-300 hover:scale-110"
        />
      </Link>

      {/* Bottom Form */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-4 px-6 bg-white relative">
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          {panelOpen && (
            <div className="absolute top-6 right-10 text-xl cursor-pointer" onClick={() => setPanelOpen(false)}>
              <FaArrowDown />
            </div>
          )}
          <form onSubmit={(e) => submitHandler(e)}>
            {/* Beautified Line */}
            <div className="line absolute h-14 w-1 top-[45%] left-10 bg-gradient-to-b from-gray-500 to-gray-800 rounded-full shadow-md"></div>

            <input
              type="text"
              name='location'
              value={formData.location}
              onClick={() => setPanelOpen(true)}
              onChange={handleInputChange}
              className="bg-[#eee] px-8 py-2 text-md rounded-lg w-full mt-4"
              placeholder='Enter pickup location' />
            <input
              type="text"
              name='destination'
              value={formData.destination}
              onClick={() => setPanelOpen(true)}
              onChange={handleInputChange}
              className="bg-[#eee] px-8 py-2 text-md rounded-lg w-full mt-4"
              placeholder='Enter destination location' />
          </form>
        </div>
        <div className="bg-red-500 h-0" ref={panelRef}></div>
      </div>

    </div >
  );
};

export default UserHome;
