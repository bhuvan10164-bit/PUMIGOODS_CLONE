import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();// de construction (email,pass)

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    const errorDetails = {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
      code: error.code || "No error code",
    };
    console.error("CRITICAL REGISTRATION ERROR:", errorDetails);
    
    return NextResponse.json(
      { 
        message: "Internal server error", 
        error: errorDetails.message,
        stack: errorDetails.stack
      },
      { status: 500 }
    );
  }
}
