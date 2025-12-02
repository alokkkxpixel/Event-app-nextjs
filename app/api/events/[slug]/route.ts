import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { NextRequest, NextResponse } from "next/server";


type RouteParams = {
    params: {
        slug: string
    }
}



// GET /api/events/[slug]
 //fetch a single event by slug 


 export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {

    try {

        await connectDB()
        const { slug } = await params // if the folder name is [id] then we detruct {id} = params
       
 


        if (!slug || typeof slug !== "string"
            || slug.trim() === ""
        ) {
            return NextResponse.json({ message: "slug is required" }, { status: 400 })
        }

         const sanitizedSlug = slug.trim().toLowerCase()

        const event = await Event.findOne({ slug:sanitizedSlug }).lean()


        // if not event is found we return this below error message
        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 })
        }

        return NextResponse.json({message:"Event fetching successfully", event}, { status: 200 })

    } catch (e) {
        return NextResponse.json(
            { message: "Server Error ", error: e instanceof Error ? e.message : "unknown" },
            { status: 400 }
        )

    }

}
