import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { PackageCheck, PackageX } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { MdRemoveShoppingCart } from "react-icons/md";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("ShopSimplyCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);

    const ShopSimplyPaymentIntent: any = localStorage.getItem(
      "ShopSimplyPaymentIntent"
    );
    const paymentIntent: string | null = JSON.parse(ShopSimplyPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((previous) => {
      let updatedCart;

      if (previous) {
        updatedCart = [...previous, product];
      } else {
        updatedCart = [product];
      }
      localStorage.setItem("ShopSimplyCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success("Added successfully to cart.", {
      style: {
        border: "1px solid #00A33A",
        borderRadius: "1px",
        padding: "15px",
        color: "#006600",
        backgroundColor: "#E0FFE0",
        height: "15%",
        width: "300px",
        fontSize: "1.1rem",
      },
      icon: (
        <div className="animation">
          <PackageCheck width={25} height={25} />
        </div>
      ),
      iconTheme: {
        primary: "#006600",
        secondary: "#FFFAEE",
      },
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);

        toast.success("Deleted successfully.", {
          style: {
            border: "1px solid #00A33A",
            borderRadius: "1px",
            padding: "15px",
            color: "#006600",
            backgroundColor: "#E0FFE0",
            height: "15%",
            width: "290px",
            fontSize: "1.1rem",
          },
          icon: (
            <div className="animation">
              <PackageX width={25} height={25} />
            </div>
          ),
          iconTheme: {
            primary: "#006600",
            secondary: "#FFFAEE",
          },
        });

        localStorage.setItem(
          "ShopSimplyCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 99) {
        return toast.error("Reach maximum limit.", {
          style: {
            border: "1px solid #FF0000",
            borderRadius: "1px",
            padding: "15px",
            color: "#FF0000",
            backgroundColor: "#FFCCCC",
            height: "15%",
            width: "250px",
            fontSize: "1.1rem",
          },
          icon: (
            <div className="animation">
              <MdRemoveShoppingCart className="w-7 h-7" />
            </div>
          ),
          iconTheme: {
            primary: "#FF0000",
            secondary: "#FFFAEE",
          },
        });
      }

      let updatedCart;

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem(
          "ShopSimplyCartItems",
          JSON.stringify(updatedCart)
        );
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) {
        return toast.error("Reach minimum limit.", {
          style: {
            border: "1px solid #FF0000",
            borderRadius: "1px",
            padding: "15px",
            color: "#FF0000",
            backgroundColor: "#FFCCCC",
            height: "15%",
            width: "250px",
            fontSize: "1.1rem",
          },
          icon: (
            <div className="animation">
              <MdRemoveShoppingCart className="h-7 w-7" />
            </div>
          ),
          iconTheme: {
            primary: "#FF0000",
            secondary: "#FFFAEE",
          },
        });
      }

      let updatedCart;

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem(
          "ShopSimplyCartItems",
          JSON.stringify(updatedCart)
        );
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);

    localStorage.setItem("ShopSimplyCartItems", JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("ShopSimplyPaymentIntent", JSON.stringify(val));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("Usecart must be used within a CartContextProvider");
  }

  return context;
};
