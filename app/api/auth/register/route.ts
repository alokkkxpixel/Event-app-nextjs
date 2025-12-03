import User from "@/database/user.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
export async function POST(req:NextRequest) {

    try {

        await connectDB()

        const {email , username , password} = await  req.json()

        if(!email || !username || !password) {
            return NextResponse.json({message:"Input feilds are required!"}, {status:400})
        }

        const existingUser = await User.findOne({email})
        
        if(existingUser){
            return NextResponse.json({Message:"User is already Exists!!"},{status:400})
        }
   
         const hashedPassword = await bcrypt.hash(password , 10)
           
   const user  = await User.create({
    username,
    email,
    password:hashedPassword
   })
              const token = jwt.sign({_id:user._id, email:user.email}, process.env.JWT_SECRET_KEY as string, {expiresIn:'7d'})

     ;(await cookies()).set('token', token ,{
         httpOnly: true,
       secure: true,
       sameSite: "strict",
       path: "/",
       maxAge: 7 * 24 * 60 * 60,
     })
          
   return NextResponse.json({message:"User is Successfully created!!", user,token} , { status:201})
 
    }catch (e) {
            // console.log(e)
            return NextResponse.json(
                { message: "Registation Failed", error: e instanceof Error ? e.message : "unknown" },
                { status: 500 }
            )
            
        }
    
}