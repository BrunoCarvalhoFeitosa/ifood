import { NextResponse } from "next/server"
import { db } from "@/app/_libs/prisma"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, image, password } = body
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        image,
        hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.error("Error creating user", { status: 500 })
  }
}
