import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
  

    (await cookies()).delete("token")

    return NextResponse.json(
      { message: "Logout Successfully" },
      { status: 200 }
    );

  } catch (e) {
    return NextResponse.json(
      { message: "Logout Failed", error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
