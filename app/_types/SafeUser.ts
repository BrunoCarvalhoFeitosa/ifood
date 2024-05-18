import { User } from "@prisma/client"

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string
  updatedAt: string
  emailVerified: Date | null
  hashedPassword: string
}
