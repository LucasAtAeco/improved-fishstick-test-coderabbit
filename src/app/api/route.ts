import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";

  const calculation = 60 * 60 * 24 * 365;

  const test =
    "Mollit velit eu quis non enim nulla quis elit eiusmod. Amet officia aute quis ex minim. Exercitation esse sint dolor ullamco anim. Aliquip sit officia sint reprehenderit et in reprehenderit pariatur consequat excepteur amet ad veniam est culpa. Veniam sunt tempor magna eiusmod occaecat. Nisi incididunt esse excepteur nisi. Quis tempor proident officia enim eiusmod dolore dolor ut veniam. Aliqua laboris ea consectetur duis Lorem et ut velit sunt eu do esse pariatur.";

  return new NextResponse(
    `Hello, ${name}! Look at this: ${calculation} or this ${test}`,
    {
      status: 200,
    }
  );
};
