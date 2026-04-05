import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    const sql = neon(process.env.POSTGRES_URL!);

    // Insert email into database
    await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;

    return NextResponse.json(
      { message: "E-Mail erfolgreich gespeichert" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { error: "Fehler beim Speichern der E-Mail" },
      { status: 500 }
    );
  }
}
