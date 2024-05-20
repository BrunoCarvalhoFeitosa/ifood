"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/app/_components/ui/button"
import { Logo } from "@/public/svgs/logo"
import { FooterWave } from "@/public/svgs/footer-wave"
import Link from "next/link"

export const Footer = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const footerRef = useRef(null)
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  }

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)

    if (footerRef.current) observer.observe(footerRef.current)

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current)
    }
  }, [footerRef, options])

  return (
    <footer ref={footerRef} className="mt-20 w-full">
      <div className="w-full bg-primary px-5 py-10 lg:py-14">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div>
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white md:h-32 md:w-32">
              <Logo width="100px" height="50px" />
            </div>
          </div>
          <div className="text-white">
            <div className="text-center lg:text-left">
              <h5 className="text-2xl font-extrabold">Já baixou nosso App?</h5>
              <p>
                Peça seu delivery, veja o menu, baixe stickers, peça e retire,
                encontre os restaurantes mais próximos, tenha todos os cupons e
                muito mais.
              </p>
            </div>
            <div className="mt-3 flex justify-center lg:justify-start">
              <Link href="https://play.google.com/store/apps/details?id=br.com.brainweb.ifood&hl=pt_BR&gl=US">
                <Button type="button" variant="outline" className="text-black">
                  Baixar o app agora mesmo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mx-auto -mt-1 w-full origin-top transition-all duration-1000 lg:w-3/4 ${isVisible ? "scale-y-[2]" : "scale-y-0"}`}
      >
        <FooterWave width="100%" height="auto" color="#EA1D2B" />
      </div>
      <div className="mx-auto flex w-[97%] flex-col gap-12 border-b border-solid border-gray-200 pb-14 pt-14 lg:flex-row lg:gap-24 lg:pb-6 lg:pt-28">
        <div className="text-center lg:text-left">
          <h6 className="mb-3 font-extrabold">Departamentos</h6>
          <ul className="flex flex-col gap-1">
            <li className="cursor-pointer">Comida brasileira</li>
            <li className="cursor-pointer">Comida japonesa</li>
            <li className="cursor-pointer">Hambúrgueres</li>
            <li className="cursor-pointer">Pizzas</li>
            <li className="cursor-pointer">Sobremesas</li>
          </ul>
        </div>
        <div className="text-center lg:text-left">
          <h6 className="mb-3 font-extrabold">Institucional</h6>
          <ul className="flex flex-col gap-1">
            <li className="cursor-pointer">Institucional</li>
            <li className="cursor-pointer">Políticas de privacidade</li>
            <li className="cursor-pointer">Políticas de cookies</li>
            <li className="cursor-pointer">Código de conduta e ética</li>
            <li className="cursor-pointer">Segurança e privacidade</li>
          </ul>
        </div>
        <div className="text-center lg:text-left">
          <h6 className="mb-3 font-extrabold">Descubra</h6>
          <ul className="flex flex-col gap-1">
            <li className="cursor-pointer">Newsletter</li>
            <li className="cursor-pointer">Fale conosco</li>
            <li className="cursor-pointer">Carreiras</li>
            <li className="cursor-pointer">Seja um entregador</li>
            <li className="cursor-pointer">
              Cadastre seu restaurante ou mercado
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto w-[97%] py-4">
        <p className="text-center lg:text-left">© Copyright 2024 - iFood</p>
      </div>
    </footer>
  )
}
