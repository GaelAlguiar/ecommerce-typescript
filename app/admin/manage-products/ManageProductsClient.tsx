"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { AiOutlineFileDone, AiOutlineFileSearch } from "react-icons/ai";
import ActionBtn from "@/app/components/ActionBtn";
import { Eye, Loader, RefreshCcw, Trash2 } from "lucide-react";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseapp from "@/libs/firebase";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseapp);
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 140,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="In the stock"
                icon={AiOutlineFileDone}
                bg="bg-green-300"
                color="text-green-900"
              />
            ) : (
              <Status
                text="Out of stock"
                icon={AiOutlineFileSearch}
                bg="bg-red-300"
                color="text-rose-900"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between w-full">
            <ActionBtn
              icon={RefreshCcw}
              onClick={() =>
                handleToggleStock(params.row.id, params.row.inStock)
              }
            />
            <ActionBtn
              icon={Trash2}
              onClick={() => handleDelete(params.row.id, params.row.images)}
            />
            <ActionBtn
              icon={Eye}
              onClick={() => router.push(`/product/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleting Product, please wait...", {
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

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("Image deleted", item.image);
          }
        }
      } catch (error) {
        return console.log("Deleting images error", error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete product");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1200px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
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

export default ManageProductsClient;
