"use client";

import React, { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { RiAdminLine, RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { LuPackageSearch, LuUserPlus2 } from "react-icons/lu";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        >
          <Avatar src={currentUser?.image} />

          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className={`absolute rounded-md shadow-md w-[200px] bg-white overflow-hidden right-0 top-12 text-sm cursor-pointer border-[2px] border-slate-300 transform translate-y-2 transition-transform duration-500 ${
              isOpen ? "translate-y-0 fade-in" : "-translate-y-full"
            }`}
          >
            {currentUser?.role === "ADMIN" ? (
              <>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>
                    <div className="flex items-center">
                      <LuPackageSearch className="h-5 w-5 text-brown-500" />
                      <span className="ml-2 text-base">My Orders</span>
                    </div>
                  </MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>
                    <div className="flex items-center">
                      <RiAdminLine className="h-5 w-5 text-yellow-500" />
                      <span className="ml-2 text-base">Admin Dashboard</span>
                    </div>
                  </MenuItem>
                </Link>
                <hr className="border-t-1 border-slate-300" />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  <div className="flex items-center">
                    <RiLogoutBoxLine className="h-5 w-5 text-rose-600" />
                    <span className="ml-2 text-base">Logout</span>
                  </div>
                </MenuItem>
              </>
            ) : currentUser ? (
              <>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>
                    <div className="flex items-center">
                      <LuPackageSearch className="h-5 w-5 text-brown-500" />
                      <span className="ml-2 text-base">My Orders</span>
                    </div>
                  </MenuItem>
                </Link>
                <hr className="border-t-1 border-slate-300" />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  <div className="flex items-center">
                    <RiLogoutBoxLine className="h-5 w-5 text-rose-600" />
                    <span className="ml-2 text-base">Logout</span>
                  </div>
                </MenuItem>
              </>
            ) : (
              <>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>
                    <div className="flex items-center">
                      <LuUserPlus2 className="h-5 w-5 text-slate-600" />
                      <span className="ml-2 text-base">Register</span>
                    </div>
                  </MenuItem>
                </Link>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>
                    <div className="flex items-center">
                      <RiLoginBoxLine className="h-5 w-5 text-teal-600" />
                      <span className="ml-2 text-base">Login</span>
                    </div>
                  </MenuItem>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
