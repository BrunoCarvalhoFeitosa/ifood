"use client"
import { Fragment, useState } from "react"
import { SafeUser } from "@/app/_types/SafeUser"
import {
  createProductComment,
  createRestaurantComment
} from "@/app/_actions/comment"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/app/_components/ui/button"
import { Flip, toast } from "react-toastify"
import { Textarea } from "@/app/_components/ui/textarea"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Loader } from "@/public/svgs/loader"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/app/_components/ui/tooltip"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/_components/ui/form"
import {
  FrownIcon,
  HeartIcon,
  SmileIcon,
  ThumbsDownIcon,
  ThumbsUpIcon
} from "lucide-react"

const formSchema = z.object({
  comment: z
    .string()
    .min(20, {
      message: "O mínimo permitido para preenchimento do campo é 20 caracteres."
    })
    .max(1000, {
      message:
        "O máximo permitido para preenchimento do campo é 1000 caracteres."
    })
})

interface CommentsFormProps {
  type: "produto" | "restaurante"
  productId?: string
  restaurantId?: string
  currentUser: SafeUser | null
}

export const CommentsForm = ({
  type,
  productId,
  restaurantId,
  currentUser
}: CommentsFormProps) => {
  const [charCount, setCharCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: ""
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
      if (productId) {
        await createProductComment(
          currentUser.id as string,
          currentUser.name as string,
          currentUser.image as string,
          values.comment as string,
          productId as string,
          undefined
        )
      }

      if (restaurantId) {
        await createRestaurantComment(
          currentUser.id as string,
          currentUser.name as string,
          currentUser.image as string,
          values.comment as string,
          undefined,
          restaurantId as string
        )
      }

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
      form.reset()
    } catch (error: any) {
      console.error("Error while create comment: ", error)
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
    }
  }

  return (
    <Fragment>
      {currentUser && (
        <div className="mt-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="flex gap-3 space-y-0">
                    <div>
                      <Avatar>
                        <AvatarImage
                          src={
                            currentUser?.image ??
                            "/images/image-blank-avatar.jpg"
                          }
                          alt={currentUser.name ?? "Usuário"}
                          title={currentUser.name ?? "Usuário"}
                          className="bg-gray-100 object-cover grayscale"
                        />
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <FormLabel className="text-foreground">
                        Escreva resumidamente sua opinião
                      </FormLabel>
                      <div className="mb-14 md:mb-2">
                        <p className="text-xs">{charCount}/1000 caracteres</p>
                      </div>
                      <div className="relative">
                        <FormControl className="relative">
                          <Textarea
                            {...field}
                            onKeyUp={(event: any) =>
                              handleTextareaChange(event)
                            }
                            placeholder="Escreva aqui seu comentário..."
                            className="min-h-32 resize-none border-gray-200 placeholder:font-normal placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            minLength={20}
                          />
                        </FormControl>
                        <TooltipProvider>
                          <div className="absolute -top-7 right-7 z-10 flex items-center gap-1 rounded-full border border-gray-200 bg-background px-5 py-1 md:-top-9 md:right-10">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="default"
                                  className="flex h-7 w-7 animate-bounce items-center justify-center rounded-full p-0 delay-100 md:h-9 md:w-9"
                                >
                                  <HeartIcon size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-foreground">
                                <p>Favoritar comentário</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="default"
                                  className="flex h-7 w-7 animate-bounce items-center justify-center rounded-full p-0 delay-200 md:h-9 md:w-9"
                                >
                                  <ThumbsUpIcon size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-foreground">
                                <p>Curtir comentário</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="default"
                                  className="flex h-7 w-7 animate-bounce items-center justify-center rounded-full p-0 delay-300 md:h-9 md:w-9"
                                >
                                  <ThumbsDownIcon size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-foreground">
                                <p>Descurtir comentário</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="default"
                                  className="flex h-7 w-7 animate-bounce items-center justify-center rounded-full p-0 delay-500 md:h-9 md:w-9"
                                >
                                  <SmileIcon size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-foreground">
                                <p>Marcar como um comentário bom</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="default"
                                  className="flex h-7 w-7 animate-bounce items-center justify-center rounded-full p-0 delay-700 md:h-9 md:w-9"
                                >
                                  <FrownIcon size={18} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-foreground">
                                <p>Marcar como um comentário ruim</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </div>
                      <FormMessage className="mt-1 text-sm font-bold" />
                      <Button
                        type="submit"
                        variant="default"
                        className="relative mt-3 flex h-14 w-full items-center gap-2 px-6 text-base"
                      >
                        {isLoading && (
                          <div className="absolute left-5 top-[50%] translate-y-[-50%]">
                            <Loader color="#FFF" width="40px" height="40px" />
                          </div>
                        )}
                        Postar opinião sobre o {type}
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      )}
    </Fragment>
  )
}
