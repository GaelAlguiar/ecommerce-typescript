"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";

import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdPendingActions,
} from "react-icons/md";
import OrderItem from "./OrderItem";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1200px] m-auto flex flex-col gap-2 border-[3px] border-slate-200 p-4">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>

      <div>Order ID: {order.id}</div>
      <div className="mt-2 mb-2">
        Total Amount:{" "}
        <span className="font-bold ">{formatPrice(order.amount / 100)}</span>
      </div>
      <div>
        <div>Payment Status:</div>
        <div className="flex gap-2 items-center mt-2 mb-2">
          {order.status === "pending" ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-300"
              color="text-slate-900"
            />
          ) : order.status === "complete" ? (
            <Status
              text="Complete"
              icon={MdDone}
              bg="bg-green-300"
              color="text-green-900"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <div>Delivery Status:</div>
        <div className="flex gap-2 items-center mt-2 mb-2">
          {order.deliveryStatus === "pending" ? (
            <Status
              text="Pending"
              icon={MdPendingActions}
              bg="bg-slate-300"
              color="text-slate-900"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="Dispatched"
              icon={BsFillBoxSeamFill}
              bg="bg-purple-300"
              color="text-purple-900"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Delivered"
              icon={TbTruckDelivery}
              bg="bg-green-300"
              color="text-green-900"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.createDate).fromNow()}</div>
      <hr className="bg-slate-200 h-[1.8px] mt-4 mb-2" />
      <div>
        <h2 className="font-bold text-slate-600 mt-4 mb-2">Products Ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QUANTITY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
