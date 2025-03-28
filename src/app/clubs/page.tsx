"use client";
import { useData } from "@/context/DataContext";
import Link from "next/link";

export default function ClubsPage() {
  const { clubs } = useData();

  return (
    <div className="px-6 py-12 bg-gray-950 text-white min-h-screen">
       <title>Student Clubs - MBM University</title>
      <meta name="description" content="Explore various student clubs at MBM University. Join communities that match your interests, from coding to cultural and technical clubs." />
      <link rel="icon" href="/favicon.ico" />
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        All Clubs
      </h1>

      {clubs.length === 0 ? (
        <p className="text-center text-gray-400">No clubs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Link key={club.id} href={`/clubs/${club.name}`} target="_blank">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-60 object-fit rounded-md mb-4"
                />
                <h3 className="text-xl font-bold">{club.name}</h3>
                <p className="text-gray-400 mt-2">{club.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
