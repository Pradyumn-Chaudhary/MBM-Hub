"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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

interface DataContextType {
  clubs: Club[];
  events: Event[];
  announcements: Announcement[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
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
    fetchData(ANNOUNCEMENTS_RANGE, setAnnouncements, ([title,club, date, message]) => ({ id: uuidv4(), title,club, date, message }));
  }, []);

  return (
    <DataContext.Provider value={{ clubs, events, announcements }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
