"use client"
import { OrderStatus, Prisma } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { formatCurrency } from "@/app/_helpers/price"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/app/_components/ui/separator"
import { BadgeCheckIcon, StarIcon } from "lucide-react"

interface AccountOrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true
      products: {
        include: {
          product: true
        }
      }
    }
  }>
}

export const AccountOrderItem = ({ order }: AccountOrderItemProps) => {
  const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "CANCELED":
        return "Cancelado"
      case "COMPLETED":
        return "Finalizado"
      case "CONFIRMED":
        return "Confirmado"
      case "DELIVERING":
        return "Em Transporte"
      case "PREPARING":
        return "Preparando"
    }
  }

  return (
    <div className="w-full min-w-[275px] overflow-hidden rounded-2xl border p-5 md:min-w-[475px] xl:w-[calc((100dvw/4)-25px)]">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <h3 className="text-base font-semibold">
            <Link href={`/restaurant/${order.restaurant.id}`}>
              {order.restaurant.name}
            </Link>
          </h3>
          <div className="flex items-center gap-1">
            <BadgeCheckIcon size={17} />
            <span className="text-xs">Verificado</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="flex items-center gap-1 text-xs">
            <strong>Id do pedido:</strong>
            <span>{order.id}.</span>
          </h4>
          <h4 className="flex items-center gap-1 text-xs">
            <strong>Data do pedido:</strong>
            <span>
              {format(order.createdAt, "dd 'de' MMMM yyyy", {
                locale: ptBR
              })}
              .
            </span>
          </h4>
          <h4 className="flex items-center gap-1 text-xs">
            <strong>Hora do pedido:</strong>
            <span>
              {format(order.createdAt, "HH:mm:ss", {
                locale: ptBR
              })}
              .
            </span>
          </h4>
          <h4 className="flex items-center gap-1 text-xs">
            <strong>Tempo de entrega:</strong>
            <span>{order.deliveryTimeMinutes} minutos.</span>
          </h4>
        </div>
        <Separator className="mt-3 bg-gray-200" />
        <div className="my-8">
          {order.products.length >= 6 ? (
            <div className="flex items-center gap-1">
              {order.products.slice(0, 4).map(({ product }) => (
                <div
                  key={product.id}
                  className="[&:not(:first-of-type)]:relative [&:not(:first-of-type)]:-ml-3"
                >
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.imageUrl}
                      width={120}
                      height={120}
                      alt={product.name}
                      className="h-[60px] w-[60px] overflow-hidden rounded-full object-cover transition-transform duration-150 hover:scale-110 lg:h-[80px] lg:w-[80px]"
                    />
                  </Link>
                </div>
              ))}
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-100 lg:h-[80px] lg:w-[80px]">
                <strong>{order.products.length}+</strong>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {order.products.map(({ product }) => (
                <div
                  key={product.id}
                  className="[&:not(:first-of-type)]:relative [&:not(:first-of-type)]:-ml-3"
                >
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.imageUrl}
                      width={120}
                      height={120}
                      alt={product.name}
                      className="h-[60px] w-[60px] overflow-hidden rounded-full object-cover transition-transform duration-300 hover:scale-110 lg:h-[80px] lg:w-[80px]"
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h5 className="font-semibold">Avaliação</h5>
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((index) => (
                <StarIcon
                  key={index}
                  size={16}
                  className="fill-yellow-600 text-yellow-600"
                />
              ))}
          </div>
        </div>
        <div>
          <h5 className="font-semibold">Status</h5>
          <p className="text-xs">{getOrderStatusLabel(order.status)}</p>
        </div>
        <div>
          <h5 className="font-semibold">Produtos</h5>
          <div className="text-xs">
            {order.products.length === 1
              ? `${order.products.length} produto`
              : `${order.products.length} produtos`}
          </div>
        </div>
        <div>
          <h5 className="font-semibold">Total</h5>
          <div className="text-xs">
            {formatCurrency(Number(order.totalPrice))}
          </div>
        </div>
      </div>
    </div>
  )
}
