import { NextRequest, NextResponse } from "next/server"
import db from "@/app/_libs/prisma"
import bcrypt from "bcrypt"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId
    const body = await req.json()
    const { name, image, password } = body
    const user = await db.user.findUnique({ where: { id: userId } })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let hashedPassword = user.hashedPassword

    if (password) {
      hashedPassword = await bcrypt.hash(password, 12)
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: name || user.name,
        image: image || user.image,
        hashedPassword
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error("Error while update user:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
