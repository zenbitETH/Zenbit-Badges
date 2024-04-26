import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
// import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  const { address: connectedAddress } = useAccount();

  const menuLinks: HeaderMenuLink[] = [
    {
      label: "Eventos",
      href: "/",
    },
  ];

  if (connectedAddress) {
    const additionalLinks: HeaderMenuLink[] = [
      {
        label: "Ver Badges",
        href: "/profile",
      },
    ];

    if (
      [
        "0x4e087b926a0752c23b4dA800424547f5932bBD0c",
        "0xdA7773E91a396d592AD33146164dA6d7d2Fda9B6",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xbd53471abf1C3827b8EeEF4898fcfe76821a3C2B",
        "0x04cc6b487566B1C821bEa04d7ac0d23CEDe05cC9",
        "0xeCB4C1245665e8A1F43826355aaB0Dd6bF336e05",
        "0xe2A45CA9Ec5780FC389FBD8991980397b8B470AF",
      ].includes(connectedAddress)
    ) {
      additionalLinks.push(
        {
          label: "Crear Evento",
          href: "/create-event",
        },
        {
          label: "Agregar Quiz",
          href: "/create-quiz",
        },
        //      {
        //        label: "Debug Contracts",
        //        href: "/debug",
        //        icon: <BugAntIcon className="h-4 w-4" />,
        //      },
      );
    }
    menuLinks.push(...additionalLinks);
  }

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li className="xl:text-xl " key={href}>
            <Link href={href} passHref className={`${isActive ? "bg-zen p-1" : ""}`}>
              <span className=" px-2   text-black rounded-full hover:text-zen">{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="fixed font-mus backdrop-blur-lg top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2 text-black">
      <div className="navbar w-full">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-zen" : ""}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          ></label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2  bg-bit  rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link
          href="/"
          passHref
          className="hidden navbar-start lg:flex items-center gap-2 shrink-0 text-2xl text-center"
        >
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/zblogo.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Zenbit Badges</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2 mx-auto">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end mr-3 w-full">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
