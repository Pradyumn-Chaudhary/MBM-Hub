"use client";
import { useData } from "@/context/DataContext";
import Link from "next/link";

export default function AnnouncementsPage() {
  const { announcements } = useData();

  return (
    <div className="px-6 py-12 bg-gray-950 text-white min-h-screen">
       <title>Latest Announcements - MBM University</title>
      <meta name="description" content="Stay updated with the latest announcements from student clubs and university departments at MBM University." />
      <link rel="icon" href="/announcements-favicon.ico" />
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Latest Announcements
      </h1>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-400">No announcements available.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {announcements
            .slice()
            .reverse()
            .map((announcement) => (
              <Link
                key={announcement.id}
                href={`${announcement.link}`}
                target="_blank"
                className="block"
              >
                <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
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
                  <p className="text-gray-300 mt-4">{announcement.message}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
