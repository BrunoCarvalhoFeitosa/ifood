-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRestaurant" DROP CONSTRAINT "_CategoryToRestaurant_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRestaurant" DROP CONSTRAINT "_CategoryToRestaurant_B_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";
