"use client"
import Image from "next/image"
import QRCode from "react-qr-code"
import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard, Navigation, Autoplay } from "swiper/modules"
import { StarHalfIcon, StarIcon } from "lucide-react"

export const Download = () => {
  return (
    <section className="w-full pb-8 pt-14">
      <div className="w-full bg-primary xl:ml-5">
        <div className="flex flex-col justify-between xl:flex-row">
          <div className="order-2 w-full xl:order-1 xl:w-[60%]">
            <div className="px-5 pt-6 md:py-10 xl:px-10">
              <div className="w-full">
                <h3 className="text-lg font-extrabold text-white md:text-4xl">
                  Comida, mercado e farmácia em casa
                </h3>
                <p className="mt-3 text-white xl:w-2/3">
                  É muito fácil fazer um pedido pelo iFood, por isso ele é o
                  melhor app de delivery. Primeiramente, faça o download do app
                  através da loja de aplicativos Android ou iOS, crie sua conta,
                  faça login, escolha os melhores pratos, finalize sua compra e
                  aguarde o pedido chegar até sua casa.
                </p>
              </div>
              <div className="my-8 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Faça o download do app
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-white">Crie sua conta</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Faça login em sua conta
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Escolha os melhores pratos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold">
                    5
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Finalize sua compra
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold">
                    6
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Espere o pedido chegar até você
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-1 flex flex-1 justify-end xl:order-2">
            <Image
              src="/images/image-download-app.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="w-full brightness-50"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-[1px] pt-[1px] lg:flex-row xl:ml-5">
        <div className="min-h-[360px] w-full bg-primary md:min-h-[400px] lg:w-2/5 xl:w-[39.55%]">
          <div className="p-5 xl:p-10">
            <h3 className="text-2xl font-bold text-white">Baixe agora o app</h3>
            <p className="mt-1 text-white">
              No seu smartphone, encontre a opção{" "}
              <strong>&quot;Ler QR Code&quot;</strong> e aponte a camêra do seu
              celular para um dos códigos ao lado. Você será redirecionado a
              página de download do aplicativo iFood correspondente ao modelo do
              seu smartphone.
            </p>
            <p className="mt-3 text-white">
              Semanalmente são gerados cupons de descontos pelos próprios
              mercados e restaurantes, baixe o app e siga-os para ser notificado
              sobre os cupons, acumule cupons e economize sempre.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[1px] md:flex-row">
          <div className="flex min-h-[360px] flex-1 flex-col justify-between bg-primary md:min-h-[400px]">
            <div className="p-5 xl:p-10">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Android</h3>
                <p className="mt-1 text-white">
                  Se você possui um smartphone Android, aponte a camêra do seu
                  celular para este QR Code.
                </p>
              </div>
            </div>
            <div className="flex w-full justify-start pl-5 md:justify-end xl:pl-0">
              <div className="h-auto w-full max-w-52 bg-white">
                <QRCode
                  size={40}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value="https://play.google.com/store/apps/details?id=br.com.brainweb.ifood&hl=pt_BR&pli=1"
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
          <div className="flex min-h-[360px] flex-1 flex-col justify-between bg-primary md:min-h-[400px]">
            <div className="p-5 xl:p-10">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">iOS</h3>
                <p className="mt-1 text-white">
                  Se você possui um smartphone iOS, aponte a camêra do seu
                  celular para este QR Code.
                </p>
              </div>
            </div>
            <div className="flex w-full justify-start pl-5 md:justify-end xl:pl-0">
              <div className="h-auto w-full max-w-52 bg-white">
                <QRCode
                  size={40}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value="https://apps.apple.com/br/app/ifood-pedir-delivery-em-casa/id483017239"
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[1px] xl:ml-5">
        <Swiper
          slidesPerView={2}
          spaceBetween={1}
          keyboard={{ enabled: true }}
          navigation={true}
          grabCursor={true}
          autoHeight={true}
          loop={true}
          modules={[Keyboard, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 }
          }}
        >
          <SwiperSlide>
            <Image
              src="/images/image-card-app-01.jpg"
              width={300}
              height={600}
              alt="Delivery de mercado, restaurante, bebidas, farmácia e pet shop"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/image-card-app-02.jpg"
              width={300}
              height={600}
              alt="Explore diversas opções de restaurantes"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/image-card-app-03.jpg"
              width={300}
              height={600}
              alt="Opções de filtros pra facilitar sua busca"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/image-card-app-04.jpg"
              width={300}
              height={600}
              alt="Faça mercado sem sair de casa"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/image-card-app-05.jpg"
              width={300}
              height={600}
              alt="Compre bebidas com apenas alguns cliques"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/image-card-app-06.jpg"
              width={300}
              height={600}
              alt="Diversos cupons pra você economizar nos seus pedidos"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/image-card-app-07.jpg"
              width={300}
              height={600}
              alt="Peça produtos de farmácia"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/image-card-app-08.jpg"
              width={300}
              height={600}
              alt="Compre rações e produtos pro seu pet"
              className="w-full"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-[2px]">
              <div className="text-base font-bold">4.8</div>
              <div className="flex items-center">
                <StarIcon size={18} className="fill-red-600 stroke-red-600" />
                <StarIcon size={18} className="fill-red-600 stroke-red-600" />
                <StarIcon size={18} className="fill-red-600 stroke-red-600" />
                <StarIcon size={18} className="fill-red-600 stroke-red-600" />
                <StarHalfIcon
                  size={18}
                  className="fill-red-600 stroke-red-600"
                />
              </div>
            </div>
            <div className="text-xs text-[#5F6368] md:text-sm">
              13,2 mi avaliações
            </div>
          </div>
          <div>
            <div className="text-base font-bold">100 mi+</div>
            <div className="text-xs text-[#5F6368] md:text-sm">Downloads</div>
          </div>
          <div>
            <div className="flex h-6 w-6 items-center justify-center bg-red-600 text-xs font-extrabold text-white">
              L
            </div>
            <div className="text-xs text-[#5F6368] md:text-sm">
              Classificação Livre
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
