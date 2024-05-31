"use client"
import { Prisma } from "@prisma/client"
import { formatCurrency } from "@/app/_helpers/price"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/app/_components/ui/accordion"

interface ProductDeliveryProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
          imageUrl: true
          deliveryFee: true
          deliveryTimeMinutes: true
        }
      }
    }
  }>
}

export const ProductDelivery = ({ product }: ProductDeliveryProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Vendido por</AccordionTrigger>
        <AccordionContent>
          Vendido e entregue por <strong>{product.restaurant.name}</strong>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Preço de entrega</AccordionTrigger>
        <AccordionContent className="flex items-center gap-1">
          <span>O preço de entrega é de</span>
          <strong>
            {formatCurrency(Number(product.restaurant.deliveryFee))}
          </strong>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Tempo de entrega</AccordionTrigger>
        <AccordionContent className="flex items-center gap-1">
          <span>O tempo estimado de entrega é de</span>
          <strong>{product.restaurant.deliveryTimeMinutes} minutos</strong>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Compra segura</AccordionTrigger>
        <AccordionContent className="flex items-center gap-1">
          <span>Receba outro pedido em casos de</span>
          <strong>má entrega, avaria</strong> ou <strong>furto</strong>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
