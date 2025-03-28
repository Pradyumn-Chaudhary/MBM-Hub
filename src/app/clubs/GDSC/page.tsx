"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const Page = () => {
  useEffect(() => {
    window.location.href = "https://clubs.mbm.ac.in/tech-clubs/google-developer-student-club";
  }, []);

  return (
    <div className="absolute w-screen top-0 min-h-screen bg-gray-950 text-white font-bold text-6xl sm:text-9xl flex justify-center items-center text-center px-4">
      <Link href="https://clubs.mbm.ac.in/tech-clubs/google-developer-student-club" className="hover:scale-105 transition-transform duration-300">
        JOIN <span className="text-yellow-500">GDSC 🧑🏻‍💻</span>
      </Link>
    </div>
  );
};

export default Page;
