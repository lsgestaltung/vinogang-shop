import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.POSTGRES_URL!);

    const subscribers = await sql`
      SELECT id, email, subscribed_at
      FROM newsletter_subscribers
      ORDER BY subscribed_at DESC
    `;

    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Fehler beim Abrufen der Subscriber" },
      { status: 500 }
    );
  }
}
