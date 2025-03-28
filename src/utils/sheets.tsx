export const addClub = async (clubName: string, category: string) => {
    const response = await fetch("/api/sheets/addClub", {
      method: "POST",
      body: JSON.stringify({ clubName, category }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  };
  
  export const deleteClub = async (clubName: string) => {
    const response = await fetch("/api/sheets/deleteClub", {
      method: "DELETE",
      body: JSON.stringify({ clubName }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  };
  
  export const addEvent = async (
    name: string,
    image: string,
    date: string,
    time: string,
    venue: string,
    link: string
  ) => {
    const response = await fetch("/api/sheets/addEvent", {
      method: "POST",
      body: JSON.stringify({ name, image, date, time, venue, link }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  };
  
  export const addAnnouncement = async (
    title: string,
    club: string,
    date: string,
    message: string,
    link: string
  ) => {
    const response = await fetch("/api/sheets/addAnnouncement", {
      method: "POST",
      body: JSON.stringify({ title, club, date, message, link }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  };
  