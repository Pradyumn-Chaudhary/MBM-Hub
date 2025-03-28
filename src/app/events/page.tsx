"use client";
import { useData } from "@/context/DataContext";
import Link from "next/link";

export default function EventsPage() {
  const { events } = useData();

  return (
    <div className="px-6 py-12 bg-gray-950 text-white min-h-screen">
       <title>Upcoming Events - MBM University</title>
      <meta name="description" content="Check out upcoming events, workshops, and hackathons happening at MBM University. Don't miss out on exciting opportunities!" />
      <link rel="icon" href="/events-favicon.ico" />
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-400">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
          {events
            .slice()
            .reverse()
            .map((event) => (
              <Link key={event.id} href={`${event.link}`} target="_blank">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-60 object-fit rounded-md mb-4"
                  />
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p className="text-gray-400 mt-2">
                    📅 {event.date} | 🕒 {event.time}
                  </p>
                  <p className="text-gray-400 mt-1">📍 {event.venue}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
