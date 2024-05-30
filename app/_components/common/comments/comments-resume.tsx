"use client"
import { Comment } from "@prisma/client"

interface CommentsResumeProps {
  comments: Comment[]
  productId: string | undefined
}

export const CommentsResume = ({
  comments,
  productId
}: CommentsResumeProps) => {
  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h4 className="flex flex-col items-center justify-center gap-0 text-center">
          <strong className="text-7xl leading-[58px]">
            {
              comments.filter((comment) => comment.productId === productId)
                .length
            }
          </strong>
          <span className="text-sm md:text-base">
            {comments.filter((comment) => comment.productId === productId)
              .length === 1
              ? "comentário"
              : "comentários"}
          </span>
        </h4>
      </div>
      <div>
        <p className="text-sm md:text-base">
          Sua opinião é muito importante para nós do iFood. Cada comentário
          postado é visto e apurado e serve como uma forma de avaliar os
          serviços que foram prestados, desde a utlização do nosso site, à
          preparação do seu pedido feita pelo restaurante, entrega feita pelo
          motoboy e o seu consumo.
        </p>
      </div>
    </div>
  )
}
