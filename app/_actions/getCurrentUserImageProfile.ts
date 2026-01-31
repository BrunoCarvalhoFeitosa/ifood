"use server"
import { supabase } from "@/app/_libs/supabase"

export const getCurrentUserImageProfile = async () => {
  const getCurrentUser = (await import("@/app/_actions/getCurrentUser")).default
  const currentUser = await getCurrentUser()

  try {
    const { data } = await supabase.storage
      .from("images")
      .getPublicUrl(currentUser?.image ?? "")

    if (data.publicUrl) {
      console.log("URL completa da imagem:", data.publicUrl)
      return data.publicUrl
    }
  } catch (error: any) {
    console.error("Erro ao obter a URL da imagem:", error.message)
    return null
  }
}
