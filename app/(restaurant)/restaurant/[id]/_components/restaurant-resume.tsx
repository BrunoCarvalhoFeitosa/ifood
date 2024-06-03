"use client"
import { Restaurant } from "@prisma/client"
import { Badge } from "@/app/_components/ui/badge"
import { StarIcon } from "lucide-react"

interface RestaurantResumeProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">
}

export const RestaurantResume = ({ restaurant }: RestaurantResumeProps) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 xl:justify-start">
        <div>
          <h1 className="text-lg font-extrabold md:text-2xl">
            {restaurant.name}
          </h1>
        </div>
        <div>
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-zinc-800 px-2 py-[2px]"
          >
            <div>
              <StarIcon size={18} className="fill-yellow-500 text-yellow-500" />
            </div>
            <div className="text-base text-white">
              <span>5.0</span>
            </div>
          </Badge>
        </div>
      </div>
      <div className="mt-5 xl:mt-2">
        <p>
          Somos especializados no que fazemos há mais de 20 anos, seguimos todos
          os padrões exigidos pela vigilência sanitária, possuímos localização
          física, com boa área para estacionamento, playground para crianças e
          um variado cardápio, procuramos sempre oferecer a melhor experiência,
          desde o atendimento até o a entrega do prato, todos os nossos chefs
          são certificados e são os melhores no que fazem. Ficaremos
          extremamente satisfeitos em atender você e sua família, visite-nos
          agora mesmo.
        </p>
      </div>
    </div>
  )
}
