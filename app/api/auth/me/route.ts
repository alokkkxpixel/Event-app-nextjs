// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import connectDB from "@/lib/mongodb";
import { User } from "@/database";

const SECRET_KEY: string = process.env.JWT_SECRET_KEY as string;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Verify token
    const decoded = await jwt.verify(token, SECRET_KEY);
    const payload = decoded as jwt.JwtPayload;

    // Get user from DB
    await connectDB();
    const user = await User.findById(payload._id as string).select("-password").lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
