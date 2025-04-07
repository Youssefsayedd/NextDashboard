import Image from "next/image";
import Dashboard from "./Pages/dashboard.js";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#000000] ">
      <Dashboard />
    </div>
  );
}
