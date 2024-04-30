"use client"
import Image from "next/image"

export const PromoBanner = () => {
  return (
    <section className="relative w-full px-5 py-6">
      <div className="w-full bg-primary md:h-[340px] lg:h-[320px] xl:h-[490px]">
        <div className="flex h-full w-full flex-col justify-between xl:flex-row">
          <div className="h-full p-8">
            <div className="flex h-full items-center">
              <h2 className="text-3xl font-thin text-white md:text-5xl xl:text-7xl">
                <div className="mb-2">Até</div>
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <strong className="text-4xl font-black md:text-6xl xl:text-8xl">
                      30%
                    </strong>
                    <span className="font-light">de</span>
                  </div>
                  <strong className="text-4xl font-black text-yellow-500 md:text-6xl xl:text-8xl">
                    desconto
                  </strong>
                </div>
                <div className="mt-2">
                  <span className="mr-2">em</span>
                  <span>pizzas</span>
                </div>
              </h2>
            </div>
          </div>
          <div className="absolute -right-48 top-[50%] translate-y-[-50%] md:-right-28 xl:-right-40 ">
            <Image
              src="/images/pizza-image.png"
              width={660}
              height={450}
              className="w-[350px] md:w-[450px] xl:w-full"
              alt="Até 30% de desconto em pizzas"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
