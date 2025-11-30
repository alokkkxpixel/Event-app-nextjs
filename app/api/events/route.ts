import { v2 as cloudinary } from 'cloudinary'
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { NextRequest, NextResponse } from "next/server";
import { resolve } from "path";
import { rejects } from "assert";
import streamifier from "streamifier";

export async function POST(req:NextRequest,res:NextResponse) {
    try {
        await connectDB()

        const formData = await req.formData()
        console.log(req.body)

        let event ;

        try {
            event = Object.fromEntries(formData.entries())

        } catch (e) {
              return NextResponse.json(
            { message: "Invaild JSON Data format ", error: e instanceof Error ? e.message : "unknown" },
            { status: 400 }
        )
        }

         const file = formData.get("image") as File;

         if(!file){
            return NextResponse.json({message:"Image is required"} , {status:400})
         }
         const arrayBuffer = await file.arrayBuffer()

         const buffer  = Buffer.from(arrayBuffer)

         const uploadResult = await new Promise((resolve, reject) => {
         cloudinary.uploader.upload_stream({ resource_type: "image", folder: "DevEvent" }, (error, result) => {
                if (error) return reject(error)
                resolve(result)
            }).end(buffer)
            // streamifier.createReadStream(buffer).pipe(stream)
         })
         
    event.image = (uploadResult as {secure_url :string}).secure_url;


        const createdEvent = await Event.create(event)

        return NextResponse.json({message:"Event Created Successfully ", event:createdEvent},{status:201})
        

    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { message: "Event Creation Failed", error: e instanceof Error ? e.message : "unknown" },
            { status: 500 }
        )
        
    }
    
}

export async function GET() {

    try {
        await connectDB()

        const events = await Event.find().sort({created:-1})
                console.log(events,"events")
            if(!events){
                return NextResponse.json({message:"Events not founded"})
            }

             return  NextResponse.json({message:"Event fetching successfully", event:events},{status:200})


    } catch (e) {
       return NextResponse.json({message:"Event fetching failed", error: e instanceof Error ? e.message : "unknown"},{status:500})       
    }
    
}