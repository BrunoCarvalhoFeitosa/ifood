"use server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { AccountUserForm } from "./_components/account-user-form"

const AccountUserPage = async () => {
  const currentUser = await getCurrentUser()

  return <AccountUserForm currentUser={currentUser} />
}

export default AccountUserPage
