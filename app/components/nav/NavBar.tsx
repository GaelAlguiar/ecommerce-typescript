import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import { FcShipped } from "react-icons/fc";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/" className="flex items-center gap-1 text-black">
              Shop<span className="text-teal-700 m-0">Simply</span>
              <FcShipped className="h-6 w-6 ml-1" />
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
};

export default NavBar;
