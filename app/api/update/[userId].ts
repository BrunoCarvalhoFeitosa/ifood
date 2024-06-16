import { NextApiRequest, NextApiResponse } from "next"
import db from "@/app/_libs/prisma"
import bcrypt from "bcrypt"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { userId },
    body: { name, image, password }
  } = req

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId as string }
    })

    if (!user) {
      return res.status(404).json({ error: "User not found." })
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
        hashedPassword
      }
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
