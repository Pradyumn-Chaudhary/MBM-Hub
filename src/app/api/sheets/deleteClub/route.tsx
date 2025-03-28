import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function DELETE(req: Request) {
  try {
    const { clubName } = await req.json();
    
    if (!clubName) {
      console.error("⛔ Missing Club Name!");
      return NextResponse.json({ error: "Club Name is required" }, { status: 400 });
    }

    console.log("✅ Deleting Club:", clubName);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const SHEET_ID = process.env.SHEET_ID;

    console.log("📄 Fetching existing club list...");

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Clubs!A2:A", // Fetch only Club Names
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === clubName);

    if (rowIndex === -1) {
      console.error("❌ Club not found:", clubName);
      return NextResponse.json({ error: "Club not found" }, { status: 404 });
    }

    console.log("🗑 Deleting row index:", rowIndex + 2);

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // ⚠️ Make sure this is the correct sheet index
                dimension: "ROWS",
                startIndex: rowIndex + 1,
                endIndex: rowIndex + 2,
              },
            },
          },
        ],
      },
    });

    console.log("✅ Club deleted successfully!");
    return NextResponse.json({ message: "Club deleted successfully!" });
  } catch (error: any) {
    console.error("❌ Google Sheets API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to delete club", details: error.message }, { status: 500 });
  }
}
