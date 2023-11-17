"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: imageType;
  quantity: number;
  price: number;
};

export type imageType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[100%] my-5" />;
};

const Horizontal2 = () => {
  return <hr className="w-[60%] my-5" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  useEffect(() => {
    if (isCartAdded) {
      setIsSectionVisible(true);
    }
  }, [isCartAdded]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: imageType) => {
      setCartProduct((previous) => {
        return { ...previous, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((previous) => {
      const newQuantity = previous.quantity + 1;
      if (newQuantity > 99) {
        return { ...previous, quantity: 99 };
      }
      return { ...previous, quantity: newQuantity };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((previous) => {
      const newQuantity = previous.quantity - 1;
      if (newQuantity < 1) {
        return { ...previous, quantity: 1 };
      }
      return { ...previous, quantity: newQuantity };
    });
  }, [cartProduct]);

  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSectionVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    handleAddProductToCart(cartProduct);
    setIsProductInCart(true);
    setIsCartAdded(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <Transition
          show={isSectionVisible}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <h2 className="text-3xl font-medium text-slate-600">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <Rating value={productRating} readOnly />
            <div>{product.reviews.length} reviews</div>
          </div>
          <Horizontal />
          <div className="text-justify text-lg">{product.description}</div>
          <Horizontal />

          <div className="text-base">
            <span className="font-semibold text-sky-800 text-base">
              Category:{" "}
            </span>
            {product.category}
          </div>
          <div className="text-base">
            <span className="font-semibold text-sky-800 text-base">
              Brand:{" "}
            </span>
            {product.brand}
          </div>
          <div
            className={
              product.inStock
                ? "text-teal-600 text-lg"
                : "text-rose-600 text-lg"
            }
          >
            {product.inStock ? "In stock" : "Out stock"}
          </div>
          <Horizontal2 />
        </Transition>
        {isProductInCart ? (
          <>
            <Transition
              show={isSectionVisible}
              enter="transition-opacity duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <p className="mt-8 mb-4 text-slate-500 flex items-center gap-1">
                <PackageCheck className="text-teal-600" size={20} />
                <span className="text-xl">Product added correctly</span>
              </p>
              <div className="max-w-[60%] text-base">
                <Button
                  label="View Cart"
                  outline={true}
                  small={false}
                  disabled={false}
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
              </div>
            </Transition>
          </>
        ) : (
          <>
            <Transition
              show={isSectionVisible}
              enter="transition-opacity duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <div>
                <SetColor
                  cartProduct={cartProduct}
                  images={product.images}
                  handleColorSelect={handleColorSelect}
                />
                <Horizontal2 />
                <SetQuantity
                  cartProduct={cartProduct}
                  handleQtyIncrease={handleQtyIncrease}
                  handleQtyDecrease={handleQtyDecrease}
                />
                <Horizontal2 />
                <div className="flex gap-1">
                  <span className="font-semibold text-sky-800 text-base">
                    Total:{" "}
                  </span>
                  <div className="text-lg ml-1">${product.price}</div>
                </div>
                <Horizontal2 />
              </div>
            </Transition>
            <Transition
              show={isSectionVisible}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <div className="max-w-[60%] text-base">
                <Button
                  label="Add to Cart"
                  onClick={() => {
                    setIsSectionVisible(false);
                    handleAddToCart();
                  }}
                  disabled={false}
                  outline={false}
                  small={false}
                />
              </div>
            </Transition>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
