'use client';
import GenderChart from '../Components/GenderChart';
import BloodTypeChart from '../Components/BloodTypeChart';
import Gender from '../Components/Gender';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Redux/userDataslice';
import HeightWeightChart from '../Components/HeightWeightChart';
import TallestUser from '../Components/TallestUser';
import HeaviestUser from '../Components/HeaviestUser';
import { useState } from 'react';
import DataTable from '../Components/Table';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-800 font-manrope 
        tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-900
        animate-fade-in-down">
        Dashboard
      </h1>

     
      <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl mb-10 
        bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black/95
        backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 
        shadow-[0_15px_40px_rgba(0,0,0,0.3)] transform transition-all hover:-translate-y-1">
        <div className="bg-gradient-to-br from-sky-200/80 to-sky-100/80 backdrop-blur-md 
          p-6 rounded-xl border border-white/20 shadow-lg shadow-sky-100 shadow-inner md:w-1/4 hover:shadow-xl 
          transition-all duration-300">
          <Gender gender="Male" />
        </div>
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <div className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 
            bg-clip-text text-transparent hover:animate-pulse">
            Users  Data
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-200/80 to-red-100/80 backdrop-blur-md 
          p-6 rounded-xl border border-white/20 shadow-lg shadow-inner inset-shadow-red-100 shadow-red-100 md:w-1/4 mt-4 md:mt-0 
          hover:shadow-xl transition-all duration-300">
          <Gender gender="Female" />
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        <div className="bg-gradient-to-br from-gray-800/95 to-black/95 backdrop-blur-xl 
          p-6 rounded-2xl border border-gray-700/50 shadow-[0_15px_40px_rgba(0,0,0,0.3)]
          transform transition-all hover:-translate-y-1">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white font-manrope 
            bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Gender Distribution
          </h2>
          <div className="h-72">
            <GenderChart maleCount={userData.maleCount} femaleCount={userData.femaleCount} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-100/90 to-cyan-100/90 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/30 shadow-[0_15px_40px_rgba(14,39,68,0.2)]
          transform transition-all hover:-translate-y-1">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 font-manrope">
            Blood Type Distribution
          </h2>
          <div className="h-72">
            <BloodTypeChart />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/95 to-black/95 backdrop-blur-xl 
          p-6 rounded-2xl border border-gray-700/50 shadow-lg
          transform transition-all hover:-translate-y-1">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white font-manrope">
            Height vs Weight Distribution
          </h2>
          <HeightWeightChart />
        </div>

        <div className="bg-gradient-to-br from-gray-800/95 to-black/95 backdrop-blur-xl 
          p-6 rounded-2xl border border-gray-700/50 shadow-lg
          transform transition-all hover:-translate-y-1">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white font-manrope">
            Extreme Measurements
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { Component: TallestUser, gender: "Male", bg: "from-sky-200/80 to-sky-100/80 shadow-sky-100" },
              { Component: TallestUser, gender: "Female", bg: "from-red-200/80 to-red-100/80 shadow-red-100" },
              { Component: HeaviestUser, gender: "Male", bg: "from-sky-200/80 to-sky-100/80 shadow-sky-100" },
              { Component: HeaviestUser, gender: "Female", bg: "from-red-200/80 to-red-100/80 shadow-red-100" },
            ].map(({ Component, gender, bg }, index) => (
              <div key={index} className={`bg-gradient-to-br ${bg} backdrop-blur-md 
                p-4 rounded-xl border border-white/20 shadow-lg hover:shadow-xl 
                hover:-translate-y-1 transition-all duration-300`}>
                <Component gender={gender} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DataTable Section */}
            <div className="mt-10 w-full max-w-7xl bg-gradient-to-br from-gray-800/95 to-black/95 
              backdrop-blur-xl rounded-2xl border border-gray-700/50 
              shadow-[0_15px_40px_rgba(0,0,0,0.3)] p-6 transform transition-all hover:-translate-y-1
              overflow-x-auto">
              <div className="min-w-[800px]">
                <DataTable userData={userData} />
              </div>
            </div>
    </div>
  );
};

export default Dashboard;