import getCurrentUser from "@/app/_actions/getCurrentUser"
import { redirect } from "next/navigation"
import { SignInForm } from "./_components/form"

const SignInPage = async () => {
  const currentUser = await getCurrentUser()

  if (currentUser) {
    return redirect("/")
  }

  return (
    <main className="mb-10 lg:mb-0">
      <SignInForm />
    </main>
  )
}

export default SignInPage
