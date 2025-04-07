'use client';
import React from 'react';
import { useSelector } from 'react-redux';

const TallestUser = ({ gender }) => {
  const userData = useSelector((state) => state.UserData);
  
  const getTallestUser = () => {
    if (!userData.users || userData.users.length === 0) return null;
    
    const filteredUsers = userData.users.filter(user => user.gender === gender.toLowerCase());
    if (filteredUsers.length === 0) return null;
    
    return filteredUsers.reduce((tallest, user) => {
      return (!tallest || user.height > tallest.height) ? user : tallest;
    }, null);
  };
  
  const tallestUser = getTallestUser();
  
  if (!tallestUser) {
    return <div style={{ color: gender === 'Male' ? '#0055A4' : '#D81B60' }}>No {gender} users found</div>;
  }
  
  return (
    <div className="flex flex-col items-center">
      <h3 style={{ color: gender === 'Male' ? '#0055A4' : '#D81B60' }} className="text-lg font-semibold mb-2">
        Tallest {gender}
      </h3>
      <div style={{ color: gender === 'Male' ? '#0055A4' : '#D81B60' }}>
        <p>Name: {tallestUser.firstName} {tallestUser.lastName}</p>
        <p>Height: {tallestUser.height} cm</p>
      </div>
    </div>
  );
};

export default TallestUser;