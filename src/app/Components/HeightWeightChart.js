import React from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";

const HeightWeightChart = () => {
  
  const userData = useSelector((state) => state.UserData.users);

  
  const chartData = userData?.map(user => ({
    height: user.height,
    weight: user.weight,
    name: `${user.firstName} ${user.lastName}`
  }))
  .filter(item => item.height && item.weight)
  .sort((a, b) => a.height - b.height) || [];

  // Handle loading state
  if (!userData) {
    return <div className="w-full h-80 flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="w-full h-80 bg-[#ACC8E5]/40 backdrop-blur-md rounded-xl p-4 border border-[#0E2744]/30 shadow-[0_0_15px_rgba(14,39,68,0.15)] relative overflow-hidden">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
      
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0E2744]/40 to-transparent"></div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#0E2744" opacity="0.3" />
          
          <XAxis
            type="number"
            dataKey="height"
            name="Height"
            unit="cm"
            domain={[(dataMin) => Math.floor(dataMin) - 5, (dataMax) => Math.floor(dataMax) + 5]}
            tickFormatter={(value) => Math.floor(value).toString()}
            tick={{ fill: "rgba(255,255,255,0.7)" }}
            stroke="rgba(255,255,255,0.3)"
          >
            <Label value="Height (cm)" position="insideBottom" offset={-5} fill="rgba(255,255,255,0.7)" />
          </XAxis>
          
          <YAxis
            type="number"
            dataKey="weight"
            name="Weight"
            unit="kg"
            domain={[(dataMin) => Math.floor(dataMin) - 5, (dataMax) => Math.floor(dataMax) + 5]}
            tick={{ fill: "rgba(255,255,255,0.7)" }}
            stroke="rgba(255,255,255,0.3)"
          >
            <Label value="Weight (kg)" angle={-90} position="insideLeft" offset={-5} fill="rgba(255,255,255,0.7)" />
          </YAxis>
          
          <Tooltip
            contentStyle={{
              background: "rgba(143, 154, 192, 0.8)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#FFFFFF", // Changed to white
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              padding: "10px 14px",
            }}
            formatter={(value, name, props) => [Math.floor(value), `${props.payload.name} (${Math.floor(value)} kg)`]}
            labelFormatter={(value) => `Height: ${Math.floor(value)} cm`}
          />
          
          <Legend
            wrapperStyle={{
              color: "rgba(255,255,255,0.8)",
              paddingTop: "20px",
              fontWeight: 300,
            }}
          />
          
          <Line
            type="monotone"
            dataKey="weight"
            name="Weight"
            stroke="#0E2744"
            strokeWidth={2.5}
            activeDot={{
              r: 6,
              fill: "#0E2744",
              stroke: "#000",
              strokeWidth: 1,
            }}
            dot={{
              r: 4,
              strokeWidth: 1,
              fill: "#0E2744",
              stroke: "#000",
              strokeDasharray: "2 2",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeightWeightChart;