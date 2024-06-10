"use client";
import Link from "next/link";
import FooterIcon from "@/components/FooterIcon";
import { AddressIcon, CellPhoneIcon, GmailIcon } from "./icons";
import FooterIcons from "@/components/FooterIcon";
import { usePathname } from "next/navigation";
import { routes } from "@/utils";
import CreditCardsIcon from "@/public/CreditCardIcons.png";
import Image from "next/image";
import Logo from "@/public/LogoWhite.png";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Reservation",
    href: "/book-online",
  },
  {
    name: "Services",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
];

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      {routes.includes(pathname) ? (
        <footer className="flex w-full flex-col bg-[#07020d]">
          <div className="container flex w-full max-w-7xl flex-col items-center justify-center px-6 gap-6 py-12 lg:px-8">
            <div className="flex items-center justify-center">
              <Image src={Logo} height={150} alt="Elite Luxury Limousine" />
            </div>
            <div className="grid grid-cols-3 max-sm:grid-cols-1  grid-flow-row gap-6">
              <div className="w-full flex flex-col gap-3 justify-start items-start">
                <h6 className="text-white text-lg font-semibold">About Us</h6>
                <p>
                  We are founded by a locally born and raised Chicagoan whose
                  passion for black car transportation is rooted in the
                  tradition of servitude. Our reputation has been built on
                  providing unparalleled luxury car service for the Chicago area
                  and suburbs. Discover the pinnacle of luxury car service where
                  safety, reliability, discretion, and professionalism are
                  provided with the VIP treatment you deserve.
                </p>
              </div>
              <div className="w-full flex flex-col gap-3 justify-start items-start">
                <h6 className="text-white text-lg font-semibold">
                  Our Services
                </h6>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link href="/#airport">Airport Transportation</Link>
                  </li>
                  <li>
                    <Link href="/#corporate">Corporate Services</Link>
                  </li>
                  <li>
                    <Link href="/#tours">Private Excursions & Tours</Link>
                  </li>
                  <li>
                    <Link href="/#events">Events and Special Occasions</Link>
                  </li>
                  <li>
                    <Link href="/#events">Sporting Events & Concerts</Link>
                  </li>
                </ul>
              </div>
              <div className="w-full flex flex-col gap-3 justify-start items-start">
                <h6 className="text-white text-lg font-semibold">
                  For More Information
                </h6>
                <Link
                  className="underline flex justify-start gap-3 items-center"
                  href="tel:+18158147041"
                >
                  <CellPhoneIcon />1 (312) 212-0587
                </Link>
                <Link
                  target="_blank"
                  className="underline flex justify-start gap-3 items-center"
                  href="https://www.google.com/maps/place/111+North+Wabash,+Suite+100,+Chicago,+IL+60602"
                >
                  <AddressIcon />
                  111 North Wabash, Suite 100, Chicago, IL 60602{" "}
                </Link>
                <div className="underline flex justify-start gap-3 items-center">
                  <AddressIcon />
                  2350 W IL Rt 120 Mchenry, IL 60051
                </div>
                <Link
                  className="underline flex justify-start gap-3 items-center select-all"
                  href="mailto:alexb@eliteluxurylimo.com?subject=Elite Luxury Limousine&body=Hi"
                >
                  <GmailIcon />
                  info@eliteluxurylimo.com
                </Link>
                <FooterIcons />
              </div>
            </div>
            <div className="flex justify-between max-sm:flex-col-reverse max-sm:items-start w-full items-center gap-6">
              <p className=" text-small text-default-400">
                &copy; 2024 Elite Luxury Limousine. All rights reserved.
              </p>
              <div className="flex flex-col justify-start items-center gap-1">
                <Image
                  src={CreditCardsIcon}
                  height={40}
                  alt="All cards Accepted"
                />
                <div>
                  <Link
                    className="text-default-400 text-small"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                  <span className="mx-1">/</span>
                  <Link
                    className="text-default-400 text-small"
                    href="/terms-conditions"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      ) : null}
    </>
  );
}
