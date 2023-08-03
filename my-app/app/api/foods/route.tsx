import { NextResponse } from "next/server";

const foods = ["apple", "pizza", "orange", "rice"];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(foods);
}
