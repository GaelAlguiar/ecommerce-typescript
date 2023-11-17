"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { TbTruckDelivery } from "react-icons/tb";
import ActionBtn from "@/app/components/ActionBtn";
import { Eye, Loader, Trash2 } from "lucide-react";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { MdDone, MdPendingActions } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    const Orders = orders.filter(
      (order) =>
        (order.status === "complete" && order.deliveryStatus === "pending") ||
        order.deliveryStatus === "dispatched"
    );

    rows = Orders.map((order) => {
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
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
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
                text="Complete"
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
      width: 240,
      renderCell: (params) => {
        return (
          <div className="flex justify-between w-full">
            <ActionBtn
              icon={TbTruckDelivery}
              onClick={() => handleDispatch(params.row.id)}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => handleDeliver(params.row.id)}
            />
            <ActionBtn
              icon={Eye}
              onClick={() => router.push(`/order/${params.row.id}`)}
            />
            <ActionBtn
              icon={Trash2}
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id: string) => {
    toast("Deleting order, please wait...", {
      style: {
        border: "1px solid #0026A3",
        borderRadius: "1px",
        padding: "15px",
        color: "#000566",
        backgroundColor: "#E0E2ff",
        height: "15%",
        width: "300px",
        fontSize: "1rem",
      },
      icon: (
        <div className="animationSpin">
          <Loader className="w-6 h-6" />
        </div>
      ),
      iconTheme: {
        primary: "#000566",
        secondary: "#EFEEFF",
      },
      duration: 1900,
    });

    axios
      .delete(`/api/order/${id}`)
      .then((res) => {
        toast.success("Order deleted");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete order");
        console.log(err);
      });
  }, []);

  const handleDispatch = useCallback((id: string) => {
    axios
      .put(`/api/order/${id}`, {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  }, []);

  const handleDeliver = useCallback((id: string) => {
    axios
      .put(`/api/order/${id}`, {
        id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Order Delivered");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1200px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
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

export default ManageOrdersClient;
