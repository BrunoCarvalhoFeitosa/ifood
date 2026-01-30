"use client"
import { ChangeEvent, useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { supabase } from "@/app/_libs/supabase"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { v4 as uuidv4 } from "uuid"
import { Flip, toast } from "react-toastify"
import axios from "axios"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Loader } from "@/public/svgs/loader"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/_components/ui/form"
import { FolderUp, LucideEye, LucideEyeOff } from "lucide-react"

interface AccountUserFormProps {
  currentUser: SafeUser | null
}

const formSchema = z.object({
  name: z
    .string()
    .min(7, {
      message: "Por favor, insira seu nome completo."
    })
    .max(70, {
      message: "O valor máximo é de 70 caracteres."
    })
    .regex(/^[A-Za-zÀ-ú ]*$/, {
      message: "Por favor, insira insira somente letras."
    }),

  image: z.string().nullable(),

  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido."
  }),

  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{7,}$/,
      {
        message:
          "Sua senha deverá conter no mínimo 7 caracteres, sendo 1 maiúsculo, 1 minúsculo e 1 número."
      }
    )
})

export const AccountUserForm = ({ currentUser }: AccountUserFormProps) => {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name ?? "",
      image: currentUser?.image ?? "",
      email: currentUser?.email ?? "",
      password: ""
    }
  })

  const handleShowOrHidePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    let file

    if (event.target.files) {
      file = event.target.files[0]
    }

    const { data, error } = await supabase.storage
      .from("image")
      .upload("public/" + `${uuidv4()}_${file?.name}`, file as File)

    if (data) {
      setImageUrl(
        `https://paldkdgawuouxbuehojq.supabase.co/storage/v1/object/public/image/${data.path}`
      )
    } else {
      console.error(
        "Error while upload user image to supabase storage: ",
        error
      )
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    if (!currentUser?.id) {
      return
    }

    const formData = {
      ...data,
      image: imageUrl ? imageUrl : currentUser?.image
    }

    axios
      .patch(`/api/update/${currentUser.id}`, formData)
      .then((res) => {
        console.log("then res", res)
        toast("Dados atualizados com sucesso.", {
          type: "success",
          toastId: "success",
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Flip
        })

        form.reset()
      })
      .catch((error: Error) => {
        console.error("Error while update user: ", error)
        toast("Erro ao atualizar os dados.", {
          type: "error",
          toastId: "error",
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Flip
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-5 border px-7 py-10"
      >
        <div className="flex flex-col items-center gap-5 xl:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full space-y-0">
                <FormLabel className="cursor-pointer text-base font-semibold text-black">
                  Nome completo
                </FormLabel>
                <FormMessage className="my-2 p-0 text-xs font-bold" />
                <FormControl>
                  <div className="mt-3">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nome completo"
                      autoComplete="off"
                      className="mt-3 h-12 w-full border-[#EFEFEF] bg-white pr-14 text-base text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({}) => (
              <FormItem className="w-full space-y-0">
                <FormLabel className="cursor-pointer text-base font-semibold text-black">
                  Foto de perfil
                </FormLabel>
                <FormMessage className="my-2 p-0 text-xs font-bold" />
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 mt-3 flex h-12 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <FolderUp size={25} />
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        PNG, JPG, ou WEBP (MAX. 800x400px)
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      id="dropzone-file"
                      onChange={(event) => handleUploadImage(event)}
                      className="mt-2 hidden"
                    />
                  </label>
                </div>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="cursor-pointer text-base font-semibold text-black">
                E-mail
              </FormLabel>
              <FormMessage className="my-2 p-0 text-xs font-bold" />
              <FormControl>
                <div className="mt-3">
                  <Input
                    {...field}
                    type="text"
                    placeholder="E-mail"
                    autoComplete="off"
                    value={currentUser?.email ?? ""}
                    disabled
                    className="mt-3 h-12 w-full border-[#EFEFEF] bg-white pr-14 text-base text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="cursor-pointer text-base font-semibold text-black">
                Confirmar senha
              </FormLabel>
              <FormMessage className="p-0 text-xs font-bold" />
              <div className="relative">
                <FormControl>
                  <div className="mt-3">
                    <Input
                      placeholder="Senha de confirmação"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      className="h-12 w-full border-[#EFEFEF] bg-white pr-14 text-base text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleShowOrHidePassword}
                  className="absolute right-0 top-[50%] translate-y-[-50%]"
                >
                  <div>
                    {showPassword ? (
                      <div>
                        <LucideEye size={25} />
                      </div>
                    ) : (
                      <div>
                        <LucideEyeOff size={25} />
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="relative flex h-14 w-full items-center gap-2 px-6 text-base xl:w-2/4"
          >
            {isLoading && (
              <div className="absolute left-5 top-[50%] translate-y-[-50%]">
                <Loader color="#FFF" width="40px" height="40px" />
              </div>
            )}
            Atualizar meus dados pessoais
          </Button>
        </div>
      </form>
    </Form>
  )
}
