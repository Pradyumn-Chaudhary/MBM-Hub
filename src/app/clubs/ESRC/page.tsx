"use client";
import { useData } from "@/context/DataContext";
import Image from "next/image";

export default function ESRCPage() {
  const { events, announcements } = useData();
  const esrcEvents = events.filter((event) => event.name.includes("ESRC"));
  const esrcAnnouncements = announcements.filter((announcement) => announcement.club.includes("ESRC"));

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center bg-fit bg-center" style={{ backgroundImage: "url('/ESRC.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-5xl font-bold text-white text-center">Embedded Systems and Robotics Club</h1>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">About ESRC</h2>
        <p className="text-gray-300 leading-relaxed">
          The Embedded Systems and Robotics Club aims to bring together robotics and embedded systems enthusiasts. We conduct workshops, competitions, and prototype development under the guidance of Dr. Alok Singh Gahlot. Year after year, students uphold the club's legacy by excelling in technical events nationwide.<b>"From concept to reality."</b>
        </p>
      </section>

      {/* Events Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">ESRC Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {esrcEvents.length > 0 ? (
            esrcEvents.map((event) => (
              <div key={event.id} className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <Image src={event.image} alt={event.name} width={300} height={200} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-bold">{event.name}</h3>
                <p className="text-gray-400">📅 {event.date} | 🕒 {event.time}</p>
                <p className="text-gray-400">📍 {event.venue}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No upcoming events.</p>
          )}
        </div>
      </section>

      {/* Announcements Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">Latest Announcements</h2>
        <div className="space-y-4">
          {esrcAnnouncements.length > 0 ? (
            esrcAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">{announcement.title}</h3>
                <p className="text-gray-400">📅 {announcement.date}</p>
                <p className="mt-2">{announcement.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No announcements at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}


// "use client";
// import React, { useEffect } from "react";
// import Link from "next/link";

// const Page = () => {
//   useEffect(() => {
//     window.location.href = "https://clubs.mbm.ac.in/tech-clubs/embedded-systems-robotics-club";
//   }, []);

//   return (
//     <div className="absolute w-screen top-0 min-h-screen bg-gray-950 text-white font-bold text-6xl sm:text-9xl flex justify-center items-center text-center px-4">
//       <Link href="https://clubs.mbm.ac.in/tech-clubs/embedded-systems-robotics-club" className="hover:scale-105 transition-transform duration-300">
//         JOIN <span className="text-yellow-500">ESRC  🤖</span>
//       </Link>
//     </div>
//   );
// };

// export default Page;
