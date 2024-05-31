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
        <AccordionContent className="flex items-center gap-1">
          <span>O preço de entrega é de</span>
          <strong>{formatCurrency(Number(restaurant.deliveryFee))}</strong>
        </AccordionContent>
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
        <AccordionTrigger>Formas de pagamento</AccordionTrigger>
        <AccordionContent className="flex items-center gap-1">
          <span>Trabalhamos com todas as bandeiras de</span>
          <strong>cartão de credito</strong> e aceitamos{" "}
          <strong>pix e dinheiro em espécie</strong>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Compra segura</AccordionTrigger>
        <AccordionContent className="flex items-center gap-1">
          <span>Receba outro pedido em casos de</span>
          <strong>má entrega, avaria</strong> ou <strong>furto</strong>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
