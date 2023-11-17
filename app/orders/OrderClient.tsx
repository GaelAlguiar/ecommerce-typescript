"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { TbTruckDelivery } from "react-icons/tb";
import ActionBtn from "@/app/components/ActionBtn";
import { Eye } from "lucide-react";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { MdDone, MdPendingActions } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";

interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    const completedOrders = orders.filter(
      (order) => order.status === "complete"
    );

    rows = completedOrders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 270 },
    { field: "customer", headerName: "Customer Name", width: 170 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="Pending"
                icon={MdPendingActions}
                bg="bg-slate-300"
                color="text-slate-900"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="Completed"
                icon={AiOutlineFileDone}
                bg="bg-green-300"
                color="text-green-900"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="Pending"
                icon={MdPendingActions}
                bg="bg-slate-300"
                color="text-slate-900"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="Dispatch"
                icon={BsFillBoxSeamFill}
                bg="bg-purple-300"
                color="text-purple-900"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
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
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-between w-full">
            <ActionBtn
              icon={Eye}
              onClick={() => router.push(`order/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1200px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;
