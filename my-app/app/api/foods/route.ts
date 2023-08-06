import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const foods = ["apple", "pizza", "orange", "rice"];

export async function GET() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json(foods, { status: 401 });
  // }

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // return NextResponse.json(foods, { status: 200 });
  return NextResponse.json(foods, { status: 200 });
}
