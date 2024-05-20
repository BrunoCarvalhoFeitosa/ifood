"use client"
import { useContext } from "react"
import { CartContext } from "@/app/_contexts/Cart"
import { formatCurrency } from "@/app/_helpers/price"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/app/_components/ui/table"
import { FileStackIcon, Trash2Icon } from "lucide-react"

export const CheckoutProductsTable = () => {
  const {
    products,
    totalDiscounts,
    totalPrice,
    subtotalPrice,
    deliveryPrice,
    removeProductFromCart
  } = useContext(CartContext)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Restaurante</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Entrega</TableHead>
          <TableHead className="text-end">Remover</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
              <div className="relative flex items-center gap-2 truncate">
                <div className="relative h-[100px] w-[130px]">
                  <Image
                    fill
                    src={product.imageUrl}
                    alt={product.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>{product.name}</div>
                <div className="absolute -left-0 top-0 bg-primary p-1.5 text-white">
                  <Link href={`/product/${product.id}`}>
                    <FileStackIcon size={18} />
                  </Link>
                </div>
              </div>
            </TableCell>
            <TableCell className="truncate">
              {product.restaurant.name}
            </TableCell>
            <TableCell className="font-medium">{product.quantity}</TableCell>
            <TableCell className="font-medium">
              {formatCurrency(Number(product.price))}
            </TableCell>
            <TableCell className="font-medium">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeProductFromCart(product.id)}
                >
                  <Trash2Icon size={20} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">
            {formatCurrency(products.length ? totalPrice : 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Subtotal</TableCell>
          <TableCell className="text-right">
            {formatCurrency(products.length ? subtotalPrice : 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Descontos</TableCell>
          <TableCell className="text-right">
            {formatCurrency(products.length ? totalDiscounts : 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Entrega</TableCell>
          <TableCell className="text-right">
            {formatCurrency(products.length ? deliveryPrice : 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
