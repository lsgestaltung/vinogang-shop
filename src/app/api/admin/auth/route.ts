import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Check password against environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
      { authenticated: false, error: "Falsches Passwort" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Authentifizierungsfehler" },
      { status: 500 }
    );
  }
}
