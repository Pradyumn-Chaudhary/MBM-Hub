"use client";
import { useData } from "@/context/DataContext";

export default function AnnouncementsPage() {
  const { announcements } = useData();

  return (
    <div className="px-6 py-12 bg-gray-950 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Latest Announcements
      </h1>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-400">No announcements available.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {announcements.slice().reverse().map((announcement) => (
            <div
              key={announcement.id}
              className="bg-gray-800 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
                  <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-blue-400">{announcement.title}</h3>
                  <h3 className="text-2xl font-bold text-blue-400">{announcement.club}</h3>
             </div>
              <p className="text-gray-400 text-sm mt-1">📅 {announcement.date}</p>
              <p className="text-gray-300 mt-4">{announcement.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
