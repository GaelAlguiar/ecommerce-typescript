"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Complete Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      // const unpaidOrders = orders.filter((order) => {
      //   return order.status === "pending";
      // });

      tempData.sale.digit = totalSale / 100;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      //tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1100px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Statistics" center />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        <div className="rounded-sm border-2 p-4 border-slate-200 flex flex-col items-center gap-2 transition bg-slate-50">
          <div className="text-xl text-slate-500 md:text-4xl font-bold">
            {formatNumber(summaryData.users.digit)}
          </div>
          <div className="text-slate-400">{summaryData.users.label}</div>
        </div>
        <div className="rounded-sm border-2 p-4 border-slate-200 flex flex-col items-center gap-2 transition bg-slate-50">
          <div className="text-xl text-slate-500 md:text-4xl font-bold">
            {formatNumber(summaryData.products.digit)}
          </div>
          <div className="text-slate-400">{summaryData.products.label}</div>
        </div>

        <div className="rounded-sm border-2 p-4 border-slate-200 flex flex-col items-center gap-2 transition bg-slate-50">
          <div className="text-xl text-slate-500 md:text-4xl font-bold">
            {formatNumber(summaryData.orders.digit)}
          </div>
          <div className="text-slate-400">{summaryData.orders.label}</div>
        </div>
        <div className="rounded-sm border-2 p-4 border-slate-200 flex flex-col items-center gap-2 transition bg-slate-50">
          <div className="text-xl text-slate-500 md:text-4xl font-bold">
            {formatNumber(summaryData.paidOrders.digit)}
          </div>
          <div className="text-slate-400">{summaryData.paidOrders.label}</div>
        </div>

        <div className="rounded-sm border-2 p-4 border-slate-200 flex flex-col items-center gap-2 transition col-span-2 bg-slate-50">
          <div className="text-xl text-slate-500 md:text-4xl font-bold">
            {formatPrice(summaryData.sale.digit)}
          </div>
          <div className="text-slate-400">{summaryData.sale.label}</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
