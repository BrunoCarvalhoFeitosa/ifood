"use server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { redirect } from "next/navigation"
import { AccountUserForm } from "./_components/account-user-form"

const AccountUserPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return redirect("/")
  }

  return <AccountUserForm currentUser={currentUser} />
}

export default AccountUserPage
