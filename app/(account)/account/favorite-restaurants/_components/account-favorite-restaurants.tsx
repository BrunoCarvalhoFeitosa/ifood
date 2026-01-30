"use client"
import { Fragment } from "react"
import {
  Restaurant,
  UserFavoriteRestaurant as BaseUserFavoriteRestaurant
} from "@prisma/client"
import { SafeUser } from "@/app/_types/SafeUser"
import { RestaurantListItem } from "@/app/_components/common/restaurant/restaurant-list-item"

interface UserFavoriteRestaurant extends BaseUserFavoriteRestaurant {
  restaurant: Restaurant
}

interface AccountFavoriteRestaurantsProps {
  currentUser: SafeUser | null
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export const AccountFavoriteRestaurants = ({
  currentUser,
  userFavoriteRestaurants
}: AccountFavoriteRestaurantsProps) => {
  return (
    <Fragment>
      {userFavoriteRestaurants.length ? (
        <div className="custom-scrollbar flex flex-col items-center gap-14 overflow-x-auto py-4 lg:flex-row lg:gap-5">
          {userFavoriteRestaurants.map(({ restaurant }) => (
            <RestaurantListItem
              key={restaurant.id}
              restaurant={restaurant}
              currentUser={currentUser}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      ) : (
        <div>
          <h3 className="font-semibold">
            Nenhum restaurante foi marcado como favorito.
          </h3>
        </div>
      )}
    </Fragment>
  )
}
