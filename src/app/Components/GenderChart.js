import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const GenderChart = () => {
  const userData = useSelector((state) => state.UserData);
  const maleCount = userData.maleCount;
  const femaleCount = userData.femaleCount;
  const data = [
    { name: 'Male', value: maleCount },
    { name: 'Female', value: femaleCount }
  ];

  const COLORS = ['#3b82f6', '#ef4444']; // Blue for male, red for female

  const renderCustomizedLegend = ({ payload }) => (
    <div className="flex flex-col gap-2 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span style={{ color: entry.color }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white mb-4 text-lg font-medium">Gender Distribution</h2>
      
      <PieChart width={300} height={200}>
      <Legend 
          content={renderCustomizedLegend}
          layout="vertical"
          verticalAlign="middle"
          align="left"
        />
        <Pie
          data={data}
          cx={90}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((LALA, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      
      </PieChart>
    </div>
  );
};

export default GenderChart;