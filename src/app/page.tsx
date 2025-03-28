"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CLUBS_RANGE = "Clubs!A2:D";
const EVENTS_RANGE = "Events!A2:F";
const ANNOUNCEMENTS_RANGE = "Announcements!A2:D";

interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Event {
  id: string;
  name: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  link: string;
}

interface Announcement {
  id: string;
  title: string;
  club: string;
  date: string;
  message: string;
}

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    async function fetchData<T>(range: string, setData: (data: T[]) => void, mapper: (row: string[]) => T) {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`
      );
      const data = await response.json();
      if (data.values) {
        setData(data.values.map(mapper));
      }
    }

    fetchData(CLUBS_RANGE, setClubs, ([id, name, description, image]) => ({ id, name, description, image }));
    fetchData(EVENTS_RANGE, setEvents, ([name, image, date, time, venue,link]) => ({ id: uuidv4(), name, image, date, time, venue,link }));
    fetchData(ANNOUNCEMENTS_RANGE, setAnnouncements, ([title,club, date, message]) => ({ id:  uuidv4(), title,club, date, message }));
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome to MBM University Hub
          </h1>
          <p className="mt-4 text-lg text-gray-300">Discover, Join & Engage with Student Clubs</p>
        </section>

       {/* Featured Clubs */}
       <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Featured Clubs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {clubs.slice(0, 3).map((club) => (
              <Link key={club.id} href={`/clubs/${club.name}`}>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <img src={club.image} alt={club.name} className="w-full h-60 object-fit rounded-md mb-4" />
                  <h3 className="text-xl font-bold">{club.name}</h3>
                  <p className="text-gray-400 mt-2">{club.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/clubs" className="text-blue-400 hover:underline"><button className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105 cursor-pointer'>Show More</button></Link>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.reverse().slice(0, 3).map((event) => (
              <Link key={event.id} href={event.link} target="_blank">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                <img src={event.image} alt={event.name} className="w-full h-60 object-fit rounded-md mb-4" />
                <h3 className="text-xl font-bold">{event.name}</h3>
                <p className="text-gray-400 mt-2">{event.date} | {event.time} | {event.venue}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/events" className="text-blue-400 hover:underline"><button className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105 cursor-pointer'>Show More</button></Link>
          </div>
        </section>

        {/* Announcements */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Latest Announcements</h2>
          <div className="space-y-4">
            {announcements.reverse().slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="bg-gray-800 p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <h3 className="text-lg font-bold">{announcement.title}</h3>
                <p className="text-gray-400">{announcement.date}</p>
                <p className="mt-2">{announcement.message}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/announcements" className="text-blue-400 hover:underline"><button className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105 cursor-pointer'>Show More</button></Link>
          </div>
        </section>
      </main>
    </div>
  );
}