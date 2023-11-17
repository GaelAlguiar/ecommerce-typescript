"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer "
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <AiOutlineShoppingCart />
      </div>
      <span className="absolute top-[-9px] right-[-10px] bg-red-700 text-white h-5 w-5 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
