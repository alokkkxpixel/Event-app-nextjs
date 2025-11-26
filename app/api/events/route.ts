import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { NextRequest, NextResponse } from "next/server";

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