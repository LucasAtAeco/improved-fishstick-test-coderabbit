import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
      throw new Error("Failed to fetch cat facts");
    }

    console.log("Fetching cat facts...");
    const catFact = await response.json();
    console.log("Cat fact fetched:", catFact.fact);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cat facts:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("An unknown error occurred");
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
