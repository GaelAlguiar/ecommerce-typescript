"use client";

import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { usePathname } from "next/navigation";
import {
  FcAddDatabase,
  FcDataConfiguration,
  FcRules,
  FcTodoList,
} from "react-icons/fc";
import Container from "../Container";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={FcRules}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={FcAddDatabase}
              selected={pathname === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={FcDataConfiguration}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={FcTodoList}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
