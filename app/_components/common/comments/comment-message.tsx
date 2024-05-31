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
            <h5 className="font-semibold">
              Quer comentar como foi sua experiência com o {type}?
            </h5>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[60px] w-[60px] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[300px]" />
              <Skeleton className="h-3 w-[250px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
          </div>
          {!currentUser && (
            <div className="mt-4">
              <Link href="/sign-in">
                <Button
                  type="button"
                  variant="default"
                  size="default"
                  className="h-14 px-6 text-base"
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
