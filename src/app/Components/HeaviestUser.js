'use client';
import React from 'react';
import { useSelector } from 'react-redux';

const HeaviestUser = ({ gender }) => {
  const userData = useSelector((state) => state.UserData);
  
  const getHeaviestUser = () => {
    if (!userData.users || userData.users.length === 0) return null;
    
    const filteredUsers = userData.users.filter(user => user.gender === gender.toLowerCase());
    if (filteredUsers.length === 0) return null;
    
    return filteredUsers.reduce((heaviest, user) => {
      return (!heaviest || user.weight > heaviest.weight) ? user : heaviest;
    }, null);
  };
  
  const heaviestUser = getHeaviestUser();
  
  if (!heaviestUser) {
    return <div style={{ color: gender === 'Male' ? '#0055A4' : '#D81B60' }}>No {gender} users found</div>;
  }
  
  return (
    <div className="flex flex-col items-center">
      <h3 style={{ color: gender === 'Male' ? '#0055A4' : '#D81B60' }} className="text-lg font-semibold mb-2">
        Heaviest {gender}
      </h3>
      <div style={{ color: gender === 'Male' ? '#0055A4' : '#D81B60' }}>
        <p>Name: {heaviestUser.firstName} {heaviestUser.lastName}</p>
        <p>Weight: {heaviestUser.weight} kg</p>
      </div>
    </div>
  );
};

export default HeaviestUser;