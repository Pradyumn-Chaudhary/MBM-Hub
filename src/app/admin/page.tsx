"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addClub, deleteClub, addAnnouncement, addEvent } from "@/utils/sheets";

const ADMIN_EMAILS = ["anukuntal2345@gmail.com", "admin2@example.com"];
const EDITOR_EMAILS = ["anukuntal2345@gmail.com", "admin2@example.com"];

export default function AdminPage() {
  const { user, login, logout } = useAuth();
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const handleButtonClick = (form: string) => {
    setActiveForm((prev) => (prev === form ? null : form)); // Toggle form visibility
  };

  const role = user
    ? ADMIN_EMAILS.includes(user.email!)
      ? "admin"
      : EDITOR_EMAILS.includes(user.email!)
      ? "editor"
      : "none"
    : "none";

  return (
    <div className="min-h-screen flex bg-gray-950 text-white absolute w-screen top-0">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sidebar - User Dashboard */}
      <div
        className={`w-${
          activeForm ? "1/3" : "full"
        } p-6 transition-all duration-300`}
      >
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        {!user ? (
          <button
            onClick={login}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        ) : (
          <div className="mt-6">
            <p className="text-lg">Welcome, {user.displayName}</p>

            <div className="mt-4 space-y-3">
              {role === "admin" && (
                <>
                  <button
                    onClick={() => handleButtonClick("club")}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
                  >
                    Add Club
                  </button>
                  <button
                    onClick={() => handleButtonClick("deleteClub")}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
                  >
                    Delete Club
                  </button>
                </>
              )}
              {role !== "none" && (
                <>
                  <button
                    onClick={() => handleButtonClick("event")}
                    className="w-full px-4 py-2 bg-yellow-500 text-black rounded cursor-pointer hover:bg-yellow-600"
                  >
                    Add Event
                  </button>
                  <button
                    onClick={() => handleButtonClick("announcement")}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600"
                  >
                    Add Announcement
                  </button>
                </>
              )}
            </div>

            <button
              onClick={logout}
              className="mt-6 w-full px-4 py-2 bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Right Section - Form */}
      {activeForm && (
        <div className="w-2/3 p-6 bg-gray-800 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4">
            {activeForm === "club" && "Add Club"}
            {activeForm === "event" && "Add Event"}
            {activeForm === "announcement" && "Add Announcement"}
            {activeForm === "deleteClub" && "Delete Club"}
          </h2>
          <button
            onClick={() => setActiveForm(null)}
            className="mb-4 px-3 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
          >
            Close
          </button>

          {/* Forms */}
          {activeForm === "club" && <AddClubForm />}
          {activeForm === "event" && <AddEventForm />}
          {activeForm === "announcement" && <AddAnnouncementForm />}
          {activeForm === "deleteClub" && <DeleteClubForm />}
        </div>
      )}
    </div>
  );
}

// Sample Forms with API Integration
const AddClubForm = () => {
  const [clubName, setClubName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName || !category) return toast.error("Please fill all fields!");

    setLoading(true);
    toast.loading("Adding club...");

    try {
      const result = await addClub(clubName, category);
      toast.dismiss();
      toast.success(result.message || "Club added successfully!");
      setClubName("");
      setCategory("");
    } catch {
      toast.dismiss();
      toast.error("Failed to add club.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Club Name"
        value={clubName}
        required
        onChange={(e) => setClubName(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        } text-white`}
      >
        {loading ? "Processing..." : "Add Club"}
      </button>
    </form>
  );
};

const AddEventForm = () => {
  const [eventData, setEventData] = useState({
    name: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    venue: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData.name || !eventData.date || !eventData.venue) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);
    toast.loading("Adding event...");

    try {
      const result = await addEvent(
        eventData.name,
        eventData.image,
        eventData.date,
        eventData.time,
        eventData.venue,
        eventData.link
      );
      toast.dismiss();
      toast.success(result.message || "Event added successfully!");
      setEventData({
        name: "",
        image: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
        venue: "",
        link: "",
      });
    } catch {
      toast.dismiss();
      toast.error("Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={eventData.name}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={eventData.image}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="time"
        name="time"
        value={eventData.time}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={eventData.venue}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="url"
        name="link"
        placeholder="Registration Link"
        value={eventData.link}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        } text-white`}
      >
        {loading ? "Processing..." : "Add Event"}
      </button>
    </form>
  );
};

const AddAnnouncementForm = () => {
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    club: "",
    date: new Date().toISOString().split("T")[0],
    message: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnnouncementData({
      ...announcementData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !announcementData.title ||
      !announcementData.club ||
      !announcementData.date ||
      !announcementData.message
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);
    toast.loading("Adding announcement...");

    try {
      const result = await addAnnouncement(
        announcementData.title,
        announcementData.club,
        announcementData.date,
        announcementData.message,
        announcementData.link
      );
      toast.dismiss();
      toast.success(result.message || "Announcement added successfully!");
      setAnnouncementData({
        title: "",
        club: "",
        date: new Date().toISOString().split("T")[0],
        message: "",
        link: "",
      });
    } catch {
      toast.dismiss();
      toast.error("Failed to add announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={announcementData.title}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="club"
        placeholder="Club Name"
        value={announcementData.club}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="date"
        name="date"
        value={announcementData.date}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={announcementData.message}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white h-24"
      ></textarea>
      <input
        type="url"
        name="link"
        placeholder="Link"
        value={announcementData.link}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        } text-white`}
      >
        {loading ? "Processing..." : "Add Announcement"}
      </button>
    </form>
  );
};

const DeleteClubForm = () => {
  const [clubName, setClubName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName) {
      toast.error("Please enter a Club Name!");
      return;
    }

    setLoading(true);
    toast.loading("Deleting club...");

    try {
      const result = await deleteClub(clubName);
      toast.dismiss();
      toast.success(result.message || "Club deleted successfully!");
      setClubName("");
    } catch {
      toast.dismiss();
      toast.error("Failed to delete club.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-500" : "bg-red-500 hover:bg-red-600 cursor-pointer"
        } text-white`}
      >
        {loading ? "Processing..." : "Delete Club"}
      </button>
    </form>
  );
};
