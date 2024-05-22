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
      <div className="custom-scrollbar flex flex-col items-center gap-14 overflow-x-auto py-3 lg:flex-row lg:gap-5">
        {orders.length >= 1 ? (
          <div>
            {orders.map((order) => (
              <AccountOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div>
            <h3 className="font-semibold">Nenhum pedido registrado.</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountOrdersPage
