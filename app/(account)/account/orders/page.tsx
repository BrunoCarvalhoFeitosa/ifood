"use server"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import db from "@/app/_libs/prisma"
import { AccountOrderItem } from "./_components/account-order-item"

const AccountOrdersPage = async () => {
  const currentUser = await getCurrentUser()

  const orders = await db.order.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true
        }
      }
    }
  })

  return (
    <div>
      {orders.length >= 1 ? (
        <div className="custom-scrollbar flex flex-col items-center gap-14 overflow-x-auto py-4 lg:flex-row lg:gap-5">
          {orders.map((order, index) => (
            <AccountOrderItem key={index} order={order} />
          ))}
        </div>
      ) : (
        <div>
          <h3 className="font-semibold">Nenhum pedido registrado.</h3>
        </div>
      )}
    </div>
  )
}

export default AccountOrdersPage
