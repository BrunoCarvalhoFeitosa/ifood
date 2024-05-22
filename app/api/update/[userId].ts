import db from "@/app/_libs/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    query: { userId },
    body: { name, image, email, password }
  } = request

  try {
    const user = await db.user.findUnique({
      where: { id: userId as string }
    })

    if (!user) {
      return response.status(404).json({ error: "User not founded." })
    }

    let hashedPassword = user.hashedPassword

    if (password) {
      hashedPassword = await bcrypt.hash(password, 12)
    }

    const updatedUser = await db.user.update({
      where: { id: userId as string },
      data: {
        name: name || user.name,
        image: image || user.image,
        email: email || user.email,
        hashedPassword
      }
    })

    return response.status(200).json(updatedUser)
  } catch (error) {
    console.error("Error while update user: ", error)
    return response.status(500).json({ error: "Internal server error." })
  }
}
