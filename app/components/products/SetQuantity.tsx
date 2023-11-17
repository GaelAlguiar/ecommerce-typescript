"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyle = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartProduct,
  cartCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : (
        <div className="font-semibold text-sky-800 text-base">Quantity</div>
      )}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQtyDecrease} className={btnStyle}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={btnStyle}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
