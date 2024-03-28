import Link from "next/link";
import FooterIcon from "@/components/FooterIcon";
import { AddressIcon, CellPhoneIcon, GmailIcon } from "./icons";
import FooterIcons from "@/components/FooterIcon";

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
  return (
    <footer className="flex w-full flex-col bg-[#07020d]">
      <div className="container flex w-full max-w-7xl flex-col items-center justify-center px-6 gap-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-6xl  text-center font-baskerville rounded-full text-white">
            Elite Luxury Limousine
          </h1>
        </div>
        <div className="grid grid-cols-3 max-sm:grid-cols-1  grid-flow-row gap-6">
          <div className="w-full flex flex-col gap-3 justify-start items-start">
            <h6 className="text-white text-lg font-semibold">About Us</h6>
            <p>
              We are founded by a locally born and raised Chicagoan whose
              passion for black car transportation is rooted in the tradition of
              servitude. Our reputation has been built on providing unparalleled
              luxury car service for the Chicago area and suburbs. Discover the
              pinnacle of luxury car service where reliability, discretion,
              professionalism are provided with the VIP treatment you deserve.
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 justify-start items-start">
            <h6 className="text-white text-lg font-semibold">Our Services</h6>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#airport">Airport Transportation</Link>
              </li>
              <li>
                <Link href="#corporate">Corporate Services</Link>
              </li>
              <li>
                <Link href="#tours">Private Excursions & Tours</Link>
              </li>
              <li>
                <Link href="#events">Events and Special Occasions</Link>
              </li>
              <li>Sporting Events & Concerts</li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-3 justify-start items-start">
            <h6 className="text-white text-lg font-semibold">
              For More Information
            </h6>
            <Link
              className="underline flex justify-start gap-3 items-center"
              href="tel:+18158147041">
              <CellPhoneIcon />1 (815) 814-7041
            </Link>
            <Link
              target="_blank"
              className="underline flex justify-start gap-3 items-center"
              href="https://www.google.com/maps/place/111+North+Wabash,+Suite+100,+Chicago,+IL+60602">
              <AddressIcon />
              111 North Wabash, Suite 100, Chicago, IL 60602{" "}
            </Link>
            <div
              className="underline flex justify-start gap-3 items-center">
              <AddressIcon />
              2350 W IL Rt 120 Mchenry, IL 60051
            </div>
            <Link
              className="underline flex justify-start gap-3 items-center select-all"
              href="mailto:alexb@eliteluxurylimo.com?subject=Elite Luxury Limousine&body=Hi">
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
          <div className="flex justify-start items-center gap-1">
            <Link
              className="text-default-400 text-small"
              href="/privacy-policy">
              Privacy Policy
            </Link>
            <span>/</span>
            <Link
              className="text-default-400 text-small"
              href="/terms-conditions">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
