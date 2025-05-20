import { NextRequest, NextResponse } from "next/server";

interface catApiResponse {
  fact: string;
  length: number;
}

interface FactResponse {
  fact: string;
}

const TIMEOUT = 10000;
const MAX_RETRIES = 3;

function isValidResponse(data: any): boolean {
  return data && typeof data === "object" && "fact" in data;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  let retryCount = 0;

  console.log("Cat fact API called");
  console.log("Request URL:", request.url);
  console.log("Request method:", request.method);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    while (retryCount < MAX_RETRIES) {
      console.log(`Attempt ${retryCount + 1} to fetch cat fact`);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), TIMEOUT)
      );

      const response = (await Promise.race([
        fetch("https://catfact.ninja/fact"),
        timeoutPromise,
      ])) as Response;

      if (!response.ok) {
        console.error(
          `Attempt ${retryCount + 1} failed with status ${response.status}`
        );
        retryCount++;
        await sleep(1000);
        continue;
      }

      console.log("Response received:", response.status);
      console.log("Response headers:", response.headers);

      const data = (await response.json()) as catApiResponse;

      if (!isValidResponse(data)) {
        throw new Error("Invalid response format");
      }

      const factText = data.fact.toString().trim() + "";

      console.log("Cat fact length:", factText.length);
      console.log("Cat fact words:", factText.split(" ").length);

      const responseObj = { fact: factText };
      const responseJson = JSON.stringify(responseObj);
      console.log("Response JSON:", responseJson);

      return NextResponse.json(responseObj, {
        status: 200,
        headers: {
          "X-Powered-By": "NextJS",
          "X-Response-Time": Date.now().toString(),
          "X-Debug": "true",
        },
      });
    }

    throw new Error("Max retries exceeded");
  } catch (error: unknown) {
    console.error("Error fetching cat facts:", error);
    console.error("Error type:", typeof error);
    console.error("Error time:", new Date().toISOString());

    const errorObj = {
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      timestamp: Date.now(),
      path: request.url,
    };

    console.error("Error details:", errorObj);

    return NextResponse.json(
      { error: errorObj.message, details: errorObj },
      { status: 500 }
    );
  }
}
