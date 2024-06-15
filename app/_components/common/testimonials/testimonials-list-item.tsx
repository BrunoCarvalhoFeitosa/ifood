"use client"
import { Testimonials } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/app/_components/ui/card"

interface TestimonialsListItemProps {
  testimonial: Testimonials
}

export const TestimonialsListItem = ({
  testimonial
}: TestimonialsListItemProps) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div>
            <Avatar>
              <AvatarImage
                src={testimonial.userImage as string}
                alt={testimonial.userName as string}
                title={testimonial.userName as string}
                className="bg-gray-100 object-cover grayscale"
              />
            </Avatar>
          </div>
          <div>
            <CardTitle>{testimonial.userName}</CardTitle>
            <CardDescription>
              @{testimonial.userName.replace(" ", "")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm">{testimonial.content}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div>
          <span className="mr-1 text-xs text-muted-foreground">
            Publicado em:
          </span>
          <span className="text-xs text-muted-foreground">
            {format(testimonial.createdAt, "dd 'de' MMMM yyyy 'às' HH:mm", {
              locale: ptBR
            })}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
