import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { db } from "@/app/_libs/prisma"
import { SafeUser } from "@/app/_types/SafeUser"

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || ""
    }
  } catch (error: any) {
    console.error("Error fetching current user:", error)
    return null
  }
}
