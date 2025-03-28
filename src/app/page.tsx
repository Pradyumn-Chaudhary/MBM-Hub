"use client";
import Link from "next/link";
import { useData } from "@/context/DataContext";

export default function Home() {
  const { clubs, events, announcements } = useData();

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome to MBM University Hub
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Discover, Join & Engage with Student Clubs
          </p>
        </section>

        {/* Featured Clubs */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Featured Clubs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {clubs.slice(0, 3).map((club) => (
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
          <div className="text-center mt-4">
            <Link href="/clubs" className="text-blue-400 hover:underline">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105 cursor-pointer">
                Show More
              </button>
            </Link>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
          {events.length === 0 ? (
            <p className="text-center text-gray-400">No upcoming events.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
              {events
                .slice()
                .reverse()
                .slice(0, 3)
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
          <div className="text-center mt-4">
            <Link href="/events" className="text-blue-400 hover:underline">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105 cursor-pointer">
                Show More
              </button>
            </Link>
          </div>
        </section>

        {/* Announcements */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Latest Announcements</h2>
          {announcements.length === 0 ? (
            <p className="text-center text-gray-400">
              No announcements available.
            </p>
          ) : (
            <div className="space-y-6 mx-auto">
              {announcements
                .slice()
                .reverse()
                .slice(0, 3)
                .map((announcement) => (
                  <Link
                    key={announcement.id}
                    href={`${announcement.link}`}
                    target="_blank"
                    className="block"
                  >
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-blue-400">
                          {announcement.title}
                        </h3>
                        <h3 className="text-2xl font-bold text-blue-400">
                          {announcement.club}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        📅 {announcement.date}
                      </p>
                      <p className="text-gray-300 mt-4">
                        {announcement.message}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link
              href="/announcements"
              className="text-blue-400 hover:underline"
            >
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105 cursor-pointer">
                Show More
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
