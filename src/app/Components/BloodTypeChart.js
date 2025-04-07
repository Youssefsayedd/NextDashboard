'use client';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Updated blood type colors using the specified palette
const BLOOD_COLORS = {
  'A+': '#250902', // Black bean
  'A-': '#38040e', // Black bean 2
  'B+': '#640d14', // Rosewood
  'B-': '#800e13', // Falu red
  'AB+': '#ad2831', // Auburn
  'AB-': '#250902', // Reuse colors if needed
  'O+': '#38040e',
  'O-': '#640d14'
};

export default function BloodTypeChart() {
  const userData = useSelector((state) => state.UserData);
  const getBloodTypeCounts = () => {
    if (!userData.users || userData.users.length === 0) return {};
    const bloodTypes = {};
    userData.users.forEach((user) => {
      if (user.bloodGroup) {
        bloodTypes[user.bloodGroup] = (bloodTypes[user.bloodGroup] || 0) + 1;
      }
    });
    return bloodTypes;
  };
  const bloodTypeCounts = getBloodTypeCounts();
    
  // Convert the blood type counts object to an array for Recharts
  const data = Object.keys(bloodTypeCounts).map(type => ({
    name: type,
    value: bloodTypeCounts[type]
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={BLOOD_COLORS[entry.name] || '#800e13'} // Default to Falu red if not found
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name) => [`Count: ${value}`, `Blood Type: ${name}`]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}