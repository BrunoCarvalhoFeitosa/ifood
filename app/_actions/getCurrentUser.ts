"use server"
import { getServerSession } from "next-auth"

async function getAuthOptions() {
  const mod = await import("@/pages/api/auth/[...nextauth]")
  return mod.authOptions
}

export async function getSession() {
  const authOptions = await getAuthOptions()
  return getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const db = (await import("@/app/_libs/prisma")).default

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    }
  } catch {
    return null
  }
}
