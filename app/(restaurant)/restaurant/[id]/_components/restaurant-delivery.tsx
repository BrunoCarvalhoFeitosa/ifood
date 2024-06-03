"use client"
import { Restaurant } from "@prisma/client"
import { formatCurrency } from "@/app/_helpers/price"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/app/_components/ui/accordion"

interface RestaurantDeliveryProps {
  restaurant: Restaurant
}

export const RestaurantDelivery = ({ restaurant }: RestaurantDeliveryProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Pedidos entregues hoje</AccordionTrigger>
        <AccordionContent>
          Hoje foram entregues <strong>192 pedidos</strong>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Preço de entrega</AccordionTrigger>
        {restaurant.deliveryFee === "0" ? (
          <AccordionContent className="flex items-center gap-1">
            <span>O frete é</span> <strong>grátis</strong>
          </AccordionContent>
        ) : (
          <AccordionContent className="flex items-center gap-1">
            <span>O preço de entrega é de</span>
            <strong>{formatCurrency(Number(restaurant.deliveryFee))}</strong>
          </AccordionContent>
        )}
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Tempo de entrega</AccordionTrigger>
        <AccordionContent className="flex items-center gap-1">
          <span>O tempo estimado de entrega é de</span>
          <strong>{restaurant.deliveryTimeMinutes} minutos</strong>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Formas de atendimento/vendas</AccordionTrigger>
        <AccordionContent>
          Vendemos pelo <strong>iFood, WhatsApp</strong> e{" "}
          <strong>presencialmente</strong>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Compra segura</AccordionTrigger>
        <AccordionContent>
          <span>Receba outro pedido em casos de</span>
          <strong className="ml-1">má entrega, avaria</strong> ou{" "}
          <strong>furto</strong>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
