import getCurrentUser from "@/app/_actions/getCurrentUser"
import { redirect } from "next/navigation"
import { SignUpForm } from "./_components/form"

const SignInPage = async () => {
  const currentUser = await getCurrentUser()

  if (currentUser) {
    return redirect("/")
  }

  return (
    <main>
      <SignUpForm />
    </main>
  )
}

export default SignInPage
