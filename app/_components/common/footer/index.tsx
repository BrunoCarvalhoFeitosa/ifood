"use client"
import { Fragment, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FooterWave } from "@/public/svgs/footer-wave"
import { usePathname } from "next/navigation"

export const Footer = () => {
  const [show, setShow] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const pathname = usePathname()
  const footerRef = useRef(null)
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
  }

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    if (pathname?.includes("/sign")) {
      setShow(false)
    }
  }, [pathname, setShow])

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)

    if (footerRef.current) observer.observe(footerRef.current)

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current)
    }
  }, [footerRef, options])

  return (
    <Fragment>
      {show && (
        <footer ref={footerRef} className="w-full">
          <div className="w-full bg-primary px-5 py-10 lg:py-16">
            <div className="flex flex-col items-center gap-6 lg:flex-row">
              <div className="text-white">
                <div className="text-center lg:text-left">
                  <h5 className="text-2xl font-extrabold">
                    Siga nossas redes sociais
                  </h5>
                  <p className="text-base">
                    Siga-nos e fique por dentro das novidades, promoções, cupons
                    de descontos e muito mais.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 lg:justify-start">
                  <Link
                    href="https://www.facebook.com/iFood"
                    className="flex h-12 w-12 items-center justify-center bg-white text-black"
                  >
                    <Image
                      src="/images/icon-social-facebook.png"
                      width={34}
                      height={34}
                      alt="Facebook"
                    />
                  </Link>
                  <Link
                    href="https://x.com/ifood"
                    className="flex h-12 w-12 items-center justify-center bg-white text-black"
                  >
                    <Image
                      src="/images/icon-social-x.png"
                      width={32}
                      height={32}
                      alt="X"
                    />
                  </Link>
                  <Link
                    href="https://br.linkedin.com/company/ifood-"
                    className="flex h-12 w-12 items-center justify-center bg-white text-black"
                  >
                    <Image
                      src="/images/icon-social-linkedin.png"
                      width={28}
                      height={28}
                      alt="LinkedIn"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mx-auto -mt-[1px] w-full origin-top transition-all duration-1000 lg:w-3/4 ${isVisible ? "scale-y-[2]" : "scale-y-0"}`}
          >
            <FooterWave width="100%" height="auto" color="#EA1D2B" />
          </div>
          <div className="mx-auto flex w-[97%] flex-col gap-12 border-b border-solid border-gray-200 pb-14 pt-14 lg:flex-row lg:gap-[70px] lg:pb-6 lg:pt-28 xl:gap-24">
            <div className="text-center lg:text-left">
              <h6 className="mb-3 font-extrabold">Departamentos</h6>
              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer text-base">
                  <Link href="/category/3c78b612-186b-443f-a5a6-6da4197108aa">
                    Comida brasileira
                  </Link>
                </li>
                <li className="cursor-pointer text-base">
                  <Link href="/category/4448168b-73d5-46cb-be84-6fd03f84a79e">
                    Comida japonesa
                  </Link>
                </li>
                <li className="cursor-pointer text-base">
                  <Link href="/category/b63590f5-ecd7-4bb6-8c7c-38edc4c6d6a9">
                    Hambúrgueres
                  </Link>
                </li>
                <li className="cursor-pointer text-base">
                  <Link href="/category/d9c61222-c20b-4b37-832b-703babd65bc8">
                    Pizzas
                  </Link>
                </li>
                <li className="cursor-pointer text-base">
                  <Link href="/category/a62c0c37-4896-43d6-b5f9-dd302831b7ce">
                    Sobremesas
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h6 className="mb-3 font-extrabold">Institucional</h6>
              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer text-base">Institucional</li>
                <li className="cursor-pointer text-base">
                  Políticas de privacidade
                </li>
                <li className="cursor-pointer text-base">
                  Políticas de cookies
                </li>
                <li className="cursor-pointer text-base">
                  Código de conduta e ética
                </li>
                <li className="cursor-pointer text-base">
                  Segurança e privacidade
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h6 className="mb-3 font-extrabold">Descubra</h6>
              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer text-base">Newsletter</li>
                <li className="cursor-pointer text-base">Fale conosco</li>
                <li className="cursor-pointer text-base">Carreiras</li>
                <li className="cursor-pointer text-base">Seja um entregador</li>
                <li className="cursor-pointer text-base">
                  Cadastre seu restaurante
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h6 className="mb-3 font-extrabold">Download</h6>
              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer text-base">
                  <Link href="https://play.google.com/store/apps/details?id=br.com.brainweb.ifood&hl=pt_BR">
                    Android
                  </Link>
                </li>
                <li className="cursor-pointer text-base">
                  <Link href="https://apps.apple.com/br/app/ifood-pedir-delivery-em-casa/id483017239">
                    iOS
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h6 className="mb-3 font-extrabold">Conta</h6>
              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer text-base">
                  <Link href="/sign-in">Entre</Link>
                </li>
                <li className="cursor-pointer text-base">
                  <Link href="/sign-up">Cadastre-se</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto w-[97%] py-4">
            <p className="text-center text-base lg:text-left">
              ©Copyright 2024 - iFood
            </p>
          </div>
        </footer>
      )}
    </Fragment>
  )
}
