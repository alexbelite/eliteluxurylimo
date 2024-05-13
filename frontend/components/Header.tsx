"use client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import {
  Navbar,
  NavbarMenu,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenuItem,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { navlinks } from "@/utils";
// Redux Imports
import { persistor } from "@/store/store";
import logo from "@/public/croplogo.png";
import Image from "next/image";
import { scrollTo } from "@/utils/CommonFunctions";
import LoginFormModal from "./AccountMangement/LoginFormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUser, resetUser } from "@/store/userSlice";
import EditProfileModal from "./AccountMangement/EditProfileModal";
import { MdEdit } from "react-icons/md";
import { resetReservationForm } from "@/store/ReservationFormSlice";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const userData = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfilePopover = (type = "desktop") => {
    if (type === "desktop") {
      setIsOpen(!isOpen);
    } else {
      setIsMobileOpen(!isMobileOpen);
    }
  };

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        isBlurred={false}
        className="dark text-[#F5A524] fixed top-0 left-0 p-0 w-full max-sm:h-[68px] h-[80px] flex justify-start lg:justify-center items-center"
      >
        {/* <Navbar isBlurred={false} className="dark header_shadow text-white fixed top-0 left-0 px-0 p-0 w-full h-[68px] flex justify-start lg:justify-center items-center"> */}
        <NavbarContent className="h-full p-0 sm:max-w-[50%] overflow-hidden ">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          />
          <NavbarBrand className="p-0 flex flex-start max-sm:w-[10%] h-full">
            <Link
              href="/"
              className=" p-0 max-sm:w-full w-full h-full relative"
              onClick={() => {
                dispatch(resetReservationForm());
              }}
            >
              <Image
                className="object-contain w-full h-full select-none object-center"
                priority
                src={logo}
                alt="logo"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        {isMenuOpen && (
          <NavbarMenu className="dark h-auto text-white py-3 backdrop-blur-sm bg-black/30">
            {navlinks.map((el) => (
              <NavbarMenuItem key={el.id}>
                <p
                  className={`cursor-pointer ${
                    pathname === el.href
                      ? "text-[#F5A524]"
                      : "text-gray/800 hover:backdrop-blur-md hover:bg-black/30"
                  } w-full p-1 my-1 text-white`}
                  onClick={() => {
                    dispatch(resetReservationForm());
                    window.location.href = el.href;
                    if (el.section) {
                      scrollTo(el.section);
                    }
                    toggleMenu();
                  }}
                >
                  {el.label}
                </p>
              </NavbarMenuItem>
            ))}
            <NavbarMenuItem className="text-white">
              {userData ? (
                <Popover
                  isOpen={isMobileOpen}
                  onOpenChange={(open) => setIsMobileOpen(open)}
                  placement="bottom"
                  color="default"
                >
                  <PopoverTrigger>
                    <div className="flex items-center cursor-pointer">
                      <FaUser className="mr-1" />
                      <p>{userData.first_name}</p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="rounded-sm p-0 shadow-lg"
                    onClick={() => {
                      handleProfilePopover("mobile");
                      toggleMenu();
                    }}
                  >
                    <div className="[&_p]:p-2 text-lg  font-500 text-black">
                      <p className="hover:bg-zinc-100">
                        Welcome, {userData.first_name}
                      </p>
                      <p
                        onClick={() => setEditModal(true)}
                        className="flex items-center justify-between hover:bg-zinc-100"
                      >
                        Edit profile <MdEdit />
                      </p>
                      <p
                        onClick={() => {
                          persistor.purge();
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="hover:bg-zinc-100"
                      >
                        Logout
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <LoginFormModal />
              )}
            </NavbarMenuItem>
          </NavbarMenu>
        )}
        <NavbarContent className="max-md:hidden" justify="start">
          {navlinks.map((el) => (
            <NavbarItem key={el.id} className="text-white">
              <p
                className="text-white cursor-pointer"
                onClick={() => {
                  dispatch(resetReservationForm());
                  window.location.href = el.href;
                  if (el.section) {
                    scrollTo(el.section);
                  }
                }}
              >
                {el.label}
              </p>
            </NavbarItem>
          ))}
          <NavbarItem className="text-white">
            {userData ? (
              <Popover
                isOpen={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
                placement="bottom"
                color="default"
              >
                <PopoverTrigger>
                  <div className="flex items-center cursor-pointer">
                    <FaUser className="mr-1" />
                    <p>{userData.first_name}</p>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="rounded-sm p-0 shadow-lg"
                  onClick={() => handleProfilePopover("desktop")}
                >
                  <div className="[&_p]:p-2 text-lg  font-500 text-black">
                    <p className="hover:bg-zinc-100">
                      Welcome, {userData.first_name}
                    </p>
                    <p
                      onClick={() => setEditModal(true)}
                      className="flex items-center justify-between hover:bg-zinc-100"
                    >
                      Edit profile <MdEdit />
                    </p>
                    <p
                      onClick={() => {
                        persistor.purge();
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="hover:bg-zinc-100"
                    >
                      Logout
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <LoginFormModal />
            )}
          </NavbarItem>
        </NavbarContent>
        {userData && editModal && (
          <EditProfileModal
            isOpen={editModal}
            onOpenChange={() => setEditModal(!editModal)}
            profile={userData}
          />
        )}
      </Navbar>
    </>
  );
}
