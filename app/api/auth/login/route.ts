import User from "@/database/user.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();
     console.log("email , password" , email , password)
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
   
    if (!match) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET is not defined");
    }
   

    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

   
    ;(await cookies()).set('token', token ,{
         httpOnly: true,
       secure: true,
       sameSite: "strict",
       path: "/",
       maxAge: 7 * 24 * 60 * 60,
     })
    return NextResponse.json(
      { message: "User login successfully", user, token },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Login Failed", error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
