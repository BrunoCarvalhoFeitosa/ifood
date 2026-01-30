"use client"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { useScroll } from "@/app/_hooks/use-scroll"
import { supabase } from "@/app/_libs/supabase"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { Flip, toast } from "react-toastify"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/_components/ui/form"
import { Loader } from "@/public/svgs/loader"
import { FolderUp, LucideEye, LucideEyeOff } from "lucide-react"

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

export const SignUpForm = () => {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const scrolled = useScroll()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
      email: "",
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
        `https://paldkdgawuouxbuehojq.supabase.co/storage/v1/object/public/images/${data.path}`
      )
    } else {
      console.error(
        "Error while upload user image to supabase storage: ",
        error
      )
    }
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const formData = { ...data, image: imageUrl }

    axios
      .post("/api/register", formData)
      .then(() => {
        toast("Usuário cadastrado com sucesso.", {
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
        console.error("Error while register user: ", error)
        toast("Erro ao cadastrar usuário.", {
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
    <div className="flex w-full flex-col items-center justify-between xl:h-[100dvh] xl:overflow-hidden">
      <header
        className={`fixed top-0 w-full px-5 py-3 ${scrolled ? "bg-white" : "bg-transparent"} z-50`}
      >
        <Link href="/" className="w-fit">
          <svg
            viewBox="0 -0.35492335728912394 1004 566.9724898595939"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="60"
          >
            <g fill="#ea1d2c">
              <path d="M0 304.6h76.41l42.46-211.2H42.45zM46.66 68.21h76.73L136 5.02H59.3zm59.47 295.82h76.42l46.69-228.18h57.31L295 93.4h-56.21l2.13-9.55c3.18-18 9.55-38.21 38.2-38.21 17 0 32.91 1.06 48.82 8.49l8.5-44.57A167.8 167.8 0 0 0 281.25 0c-61.56 0-104 36.09-119.93 93.4h-26.53l-8.49 42.45h26.53z" />
              <path d="M348.11 308.85c90.21 0 152.83-81.73 152.83-148.59 0-49.88-45.64-71.11-90.21-71.11-98.73 0-152.83 88.14-152.83 148.59 0 49.88 46.7 71.11 90.21 71.11m242 0c90.21 0 152.83-81.73 152.83-148.59 0-49.88-46.7-71.11-91.28-71.11-98.7 0-152.82 88.09-152.82 148.59 0 49.88 47.76 71.11 91.27 71.11m277-4.25h75.35L1004 4.29h-76.41l-18.05 89.15-31.84-3.18c-74.29 0-142.21 95.51-142.21 163.44 0 27.59 18 55.19 48.82 55.19 43.51 0 74.29-21.23 87-42.46h4.24zM631.48 462.74a295 295 0 0 1-212.26 66.86c-100.83-6.37-173-83.85-185.73-165.57h4.24c23.35 51 79.6 98.71 148.59 106.13 70 8.49 153.89-23.34 199.52-66.86l-50.94-39.27h153.89l-34 163.45-22.29-63.68z" />
            </g>
          </svg>
        </Link>
      </header>
      <div className="flex h-full w-full items-center py-10 pt-32 md:py-14 md:pt-36 lg:py-5 lg:pt-32 xl:py-0 2xl:gap-20">
        <div className="w-full xl:mt-12 xl:w-[50%]">
          <div className="mb-10 px-5 xl:mb-5">
            <h1 className="text-3xl font-semibold md:text-5xl">
              Cadastre-se agora
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira seus dados e aproveite as promoções.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-5 px-5"
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
                            type="text"
                            placeholder="Nome completo"
                            autoComplete="off"
                            className="mt-3 h-12 w-full border-[#EFEFEF] bg-white pr-14 text-base text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            {...field}
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
                          type="text"
                          placeholder="E-mail"
                          autoComplete="off"
                          className="mt-3 h-12 w-full border-[#EFEFEF] bg-white pr-14 text-base text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                          {...field}
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
                      Senha
                    </FormLabel>
                    <FormMessage className="p-0 text-xs font-bold" />
                    <div className="relative">
                      <FormControl>
                        <div className="mt-3">
                          <Input
                            placeholder="Senha"
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
              <div className="flex justify-end">
                <Link
                  href="/sign-in"
                  className="text-xs font-bold text-red-600 underline"
                >
                  Já tem uma conta? Faça login agora.
                </Link>
              </div>
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
                  Criar minha conta agora
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="relative hidden h-full flex-1 overflow-hidden bg-gray-100 lg:flex">
          <Image
            fill
            src="/images/image-authentication.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            className="h-full w-full animate-zoom object-cover"
          />
        </div>
      </div>
    </div>
  )
}
