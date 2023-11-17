"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/products/${item.id}`}>
          <div className="relative h-[80px] w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/products/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px] flex ">
            <Trash2 className="h-3 w-3 mt-1 mr-1 text-red-700" />
            <button
              className="text-red-700 underline"
              onClick={() => {
                handleRemoveProductFromCart(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center ml-3">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold text-slate-600 text-sm">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
