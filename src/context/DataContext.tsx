"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const CLUBS_RANGE = "Clubs!A2:B";
const EVENTS_RANGE = "Events!A2:F";
const ANNOUNCEMENTS_RANGE = "Announcements!A2:E";

interface Club {
  id: string;
  name: string;
  category: string;
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
  link: string;
}

interface DataContextType {
  clubs: Club[];
  events: Event[];
  announcements: Announcement[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [unfilteredEvents, setUnfilteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [unfilteredAnnouncements, setUnfilteredAnnouncements] = useState<Announcement[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    async function fetchData<T>(
      range: string,
      setData: (data: T[]) => void,
      mapper: (row: string[]) => T
    ) {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`
      );
      const data = await response.json();
      if (data.values) {
        setData(data.values.map(mapper));
      }
    }

    fetchData(CLUBS_RANGE, setClubs, ([name, category]) => ({
      id: uuidv4(),
      name,
      category,
      image: `${name}.png`,
    }));
    fetchData(
      EVENTS_RANGE,
      setUnfilteredEvents,
      ([name, image, date, time, venue, link]) => ({
        id: uuidv4(),
        name,
        image,
        date,
        time,
        venue,
        link,
      })
    );
    fetchData(
      ANNOUNCEMENTS_RANGE,
      setUnfilteredAnnouncements,
      ([title, club, date, message, link]) => ({
        id: uuidv4(),
        title,
        club,
        date,
        message,
        link,
      })
    );
  }, []);

   // **Filter unfilteredEvents only once after fetching is completed**
  useEffect(() => {
    if (unfilteredEvents.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      setEvents(unfilteredEvents.filter((event) => event.date >= today)); // Remove past events
    }
  }, [unfilteredEvents]); // Runs only when `unfilteredEvents` is updated

   // **Filter unfilteredAnnouncements only once after fetching is completed**
  useEffect(() => {
    if (unfilteredAnnouncements.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      setAnnouncements(unfilteredAnnouncements.filter((announcement) => announcement.date >= today)); // Remove past Announcements
    }
  }, [unfilteredAnnouncements]); // Runs only when `unfilteredAnnouncements` is updated
  
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
