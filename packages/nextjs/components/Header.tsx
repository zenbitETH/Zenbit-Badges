import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
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
      label: "Events",
      href: "/",
    },
  ];

  if (connectedAddress) {
    const additionalLinks: HeaderMenuLink[] = [
      {
        label: "My Badges",
        href: "/profile",
      },
    ];

    if (
      [
        "0x4e087b926a0752c23b4dA800424547f5932bBD0c",
        "0xdA7773E91a396d592AD33146164dA6d7d2Fda9B6",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xbd53471abf1C3827b8EeEF4898fcfe76821a3C2B",
      ].includes(connectedAddress)
    ) {
      additionalLinks.push(
        {
          label: "Create Event",
          href: "/create-event",
        },
        {
          label: "Create Quiz",
          href: "/create-quiz",
        },
        {
          label: "Debug Contracts",
          href: "/debug",
          icon: <BugAntIcon className="h-4 w-4" />,
        },
      );
    }
    menuLinks.push(...additionalLinks);
  }

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li className="text-xl" key={href}>
            <Link href={href} passHref className={`${isActive ? "bg-dai p-1" : ""}`}>
              <span className=" px-3 text-black rounded-full hover:text-dai">{label}</span>
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
    <div className="sticky font-mus lg:static top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2 text-black">
      <div className="navbar w-full">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2  bg-base-100 rounded-box w-52"
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
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
