import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export type USER_ROLE = "player" | "admin";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  try {
    const { role } = await request.json();

    if (!role) {
      return NextResponse.json(
        { message: "The role is required" },
        { status: 400 }
      );
    }

    cookieStore.set("USER_ROLE", role, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json({ message: "Cookie created" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating cookie", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("USER_ROLE");

  if (!userRole) {
    return NextResponse.json({ message: "Cookie not found" }, { status: 404 });
  }

  return NextResponse.json({ role: userRole.value });
}
