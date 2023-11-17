"use client";

import {
  CartProductType,
  imageType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: imageType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-1 h-full max-h-[100%] min-h-[90%] sm:min-h-[90%] xl:mt-10">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
        {product.images.map((image: imageType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative w-[90%] aspect-square rounded border-teal-600 ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square flex items-center justify-center md:mt-20 xl:mt-10">
        <Image
          fill
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:max-h-[400px] sm:min-h-[300px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
