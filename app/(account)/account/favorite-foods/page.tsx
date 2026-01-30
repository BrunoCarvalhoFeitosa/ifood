export const dynamic = "force-dynamic"
import db from "@/app/_libs/prisma"
import getCurrentUser from "@/app/_actions/getCurrentUser"
import { ProductListItem } from "@/app/_components/common/product/product-list-item"

const AccountFavoriteFoodsPage = async () => {
  const currentUser = await getCurrentUser()

  const userFavoriteProducts = await db.userFavoriteProduct.findMany({
    where: {
      userId: currentUser?.id
    },
    include: {
      product: {
        include: {
          restaurant: true,
          category: true,
          favoritedByUsers: true
        }
      }
    }
  })

  return (
    <div>
      {userFavoriteProducts.length >= 1 ? (
        <div className="custom-scrollbar flex flex-col items-center gap-14 overflow-x-auto lg:flex-row lg:gap-5">
          {userFavoriteProducts.map(({ product }) => (
            <ProductListItem
              key={product.id}
              product={product}
              currentUser={currentUser}
              userFavoriteProducts={userFavoriteProducts}
            />
          ))}
        </div>
      ) : (
        <div>
          <h3 className="font-semibold">
            Nenhuma comida foi marcada como favorita.
          </h3>
        </div>
      )}
    </div>
  )
}

export default AccountFavoriteFoodsPage
