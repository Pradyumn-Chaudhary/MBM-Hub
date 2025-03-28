import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const { clubName, category } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const SHEET_ID = process.env.SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Clubs!A2:B",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[clubName, category]] },
    });

    return NextResponse.json({ message: "Club added successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add club" }, { status: 500 });
  }
}
