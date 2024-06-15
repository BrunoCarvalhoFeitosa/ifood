"use client"
import { SafeUser } from "@/app/_types/SafeUser"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { Skeleton } from "@/app/_components/ui/skeleton"
import { Fragment } from "react"

interface CommenMessageProps {
  type: "produto" | "restaurante"
  currentUser: SafeUser | null
}

export const CommentMessage = ({ type, currentUser }: CommenMessageProps) => {
  return (
    <Fragment>
      {!currentUser && (
        <section className="mt-10 md:ml-28">
          <div className="mb-2">
            <h5 className="text-lg font-extrabold leading-none">
              Quer comentar como foi sua experiência com o {type}?
            </h5>
          </div>
          <div className="my-6 flex items-center space-x-4">
            <Skeleton className="h-[60px] w-[60px] rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-full rounded-none md:w-[300px]" />
              <Skeleton className="h-3 w-2/3 rounded-none md:w-[250px]" />
              <Skeleton className="h-3 w-2/4 rounded-none md:w-[200px]" />
            </div>
          </div>
          {!currentUser && (
            <div className="mt-4">
              <Link href="/sign-in">
                <Button
                  type="button"
                  variant="default"
                  size="default"
                  className="h-14 w-full px-6 text-base md:w-fit"
                >
                  Identifique-se para fazer um comentário
                </Button>
              </Link>
            </div>
          )}
        </section>
      )}
    </Fragment>
  )
}
