"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlinePayments } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Payment Success.", {
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
                <MdOutlinePayments className="w-6 h-6" />
              </div>
            ),
            iconTheme: {
              primary: "#006600",
              secondary: "#FFFAEE",
            },
          });

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };

  return (
    <form onClick={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Checkout" />
      </div>
      <h2 className="font-semibold mb-2">Adress Information</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US", "MX"],
        }}
      />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 px-5 text-right text-xl font-bold">
        <hr className="pb-5 border-t-2" />
        <div
          className="text-slate-700"
          style={{
            display: "inline",
            padding: "0.25rem",
          }}
        >
          Total:
        </div>
        <div style={{ display: "inline" }} className="text-red-700">
          {formattedPrice}
        </div>
      </div>
      <Button
        label={isLoading ? "Processing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        outline={false}
        small={false}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
