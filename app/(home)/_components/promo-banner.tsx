"use client"
import Image from "next/image"

export const PromoBannerPizza = () => {
  return (
    <section className="relative w-full px-5 py-10">
      <div className="h-[240px] w-full bg-primary md:h-[300px] lg:h-[320px] xl:h-[410px]">
        <div className="flex h-full w-full flex-col justify-between xl:flex-row">
          <div className="absolute -right-24 top-[50%] translate-y-[-50%] md:-right-28 xl:-right-80">
            <div className="flex">
              <Image
                src="/images/pizza-image.png"
                width={620}
                height={450}
                quality={100}
                className="hidden w-[350px] brightness-[0.80] md:w-[400px] lg:block lg:w-[420px] xl:w-[30%]"
                alt="Até 30% de desconto em pizzas"
              />
              <Image
                src="/images/pizza-image.png"
                width={620}
                height={450}
                quality={100}
                className="hidden w-[350px] brightness-[0.80] md:block md:w-[400px] lg:w-[420px] xl:w-[30%]"
                alt="Até 30% de desconto em pizzas"
              />
              <Image
                src="/images/pizza-image.png"
                width={620}
                height={450}
                quality={100}
                className="w-[350px] brightness-[0.80] md:w-[400px] lg:w-[420px] xl:w-[30%] 2xl:block"
                alt="Até 30% de desconto em pizzas"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
