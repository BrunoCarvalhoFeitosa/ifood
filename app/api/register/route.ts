export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import db from "@/app/_libs/prisma"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, image, email, password } = body
  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await db.user.create({
    data: {
      name,
      image,
      email,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}
