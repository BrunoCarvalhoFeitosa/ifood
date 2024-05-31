/* eslint-disable no-unused-vars */
"use client"
import { useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Flip, toast } from "react-toastify"
import { createTestimonialComment } from "@/app/_actions/testimonials"
import { Loader } from "@/public/svgs/loader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/app/_components/ui/dialog"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Textarea } from "@/app/_components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/_components/ui/form"

interface TestimonialsDialogModalProps {
  setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void
  isConfirmDialogOpen: boolean
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
    .regex(/^[A-Za-z ]*$/, {
      message: "Por favor, insira insira somente letras."
    }),

  image: z.string().nullable(),

  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido."
  }),

  comment: z
    .string({
      message: "O mínimo permitido para preenchimento do campo é 20 caracteres."
    })
    .min(20, {
      message: "O mínimo permitido para preenchimento do campo é 20 caracteres."
    })
    .max(1000, {
      message:
        "O máximo permitido para preenchimento do campo é 1000 caracteres."
    })
})

export const TestimonialsDialogModal = ({
  setIsConfirmDialogOpen,
  isConfirmDialogOpen,
  currentUser
}: TestimonialsDialogModalProps) => {
  const [charCount, setCharCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name as string,
      image: currentUser?.image as string,
      email: currentUser?.email as string
    }
  })

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCharCount(event.target.value.length)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentUser?.id) return

    setIsLoading(true)

    try {
      await createTestimonialComment(
        currentUser.id as string,
        currentUser.name as string,
        currentUser.image as string,
        values.comment as string
      )

      toast("Comentário postado com sucesso.", {
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

      setCharCount(0)
      form.setValue("comment", "")
    } catch (error: any) {
      console.error("Error while create testimonial: ", error)
      toast("Erro ao postar comentário.", {
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
    } finally {
      setIsLoading(false)
      setIsConfirmDialogOpen(false)
    }
  }

  return (
    <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como você avalia os nossos serviços?</DialogTitle>
          <DialogDescription>
            Ao postar sua opinião, ela será exposta publicamente no mural de
            testemunhos dos nossos clientes que também já opinaram.
          </DialogDescription>
        </DialogHeader>
        {currentUser && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 md:mt-12"
            >
              <div className="flex gap-5">
                <div>
                  <Avatar>
                    <AvatarImage
                      src={currentUser.image as string}
                      alt={currentUser.name as string}
                      title={currentUser.name as string}
                      className="bg-gray-100 object-cover grayscale"
                    />
                  </Avatar>
                </div>
                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-foreground">
                          Nome completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Nome completo"
                            value={currentUser?.name as string}
                            autoComplete="off"
                            className="mt-3 h-12 w-full border-[#EFEFEF] bg-white text-base text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            disabled
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-sm font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-foreground">
                          E-mail
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="E-mail"
                            value={currentUser?.email as string}
                            autoComplete="off"
                            className="mt-3 h-12 w-full border-[#EFEFEF] bg-white text-base text-zinc-800 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            disabled
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-sm font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Mensagem
                        </FormLabel>
                        <div className="mb-14 md:mb-2">
                          <p className="text-xs">{charCount}/1000 caracteres</p>
                        </div>
                        <FormControl className="relative">
                          <Textarea
                            {...field}
                            onKeyUp={(event: any) =>
                              handleTextareaChange(event)
                            }
                            placeholder="Escreva aqui seu comentário..."
                            className="min-h-48 resize-none border-gray-200 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            minLength={20}
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-sm font-bold" />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="default"
                      className="relative mt-3 flex h-14 w-full items-center gap-2 px-6 text-base md:w-2/4"
                    >
                      {isLoading && (
                        <div className="absolute left-5 top-[50%] translate-y-[-50%]">
                          <Loader color="#FFF" width="40px" height="40px" />
                        </div>
                      )}
                      Postar minha opinião agora
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
