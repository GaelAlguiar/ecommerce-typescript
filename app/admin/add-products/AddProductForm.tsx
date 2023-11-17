"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/input";
import firebaseapp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import {
  FileBox,
  FileX2,
  FolderSync,
  Loader,
  PackageCheck,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

export const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected", {
        style: {
          border: "1px solid #FF0000",
          borderRadius: "1px",
          padding: "15px",
          color: "#FF0000",
          backgroundColor: "#FFCCCC",
          height: "15%",
          width: "290px",
          fontSize: "1.1rem",
        },
        icon: (
          <div className="animation">
            <FileBox className="h-6 w-6" />
          </div>
        ),
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Image has not been added", {
        style: {
          border: "1px solid #FF0000",
          borderRadius: "1px",
          padding: "15px",
          color: "#FF0000",
          backgroundColor: "#FFCCCC",
          height: "15%",
          width: "290px",
          fontSize: "1.1rem",
        },
        icon: (
          <div className="animation">
            <FileX2 className="h-6 w-6" />
          </div>
        ),
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    }

    const handleImageUploads = async () => {
      toast("Creating Product, please wait...", {
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
      });

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseapp);
            const storageRef = ref(storage, `products/ ${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the dowload URL:", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads", {
          style: {
            border: "1px solid #FF0000",
            borderRadius: "1px",
            padding: "15px",
            color: "#FF0000",
            backgroundColor: "#FFCCCC",
            height: "15%",
            width: "290px",
            fontSize: "1.1rem",
          },
          icon: (
            <div className="animation">
              <FolderSync className="h-6 w-6" />
            </div>
          ),
          iconTheme: {
            primary: "#FF0000",
            secondary: "#FFFAEE",
          },
        });
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product Added Correctly", {
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
              <PackageCheck className="w-6 h-6" />
            </div>
          ),
          iconTheme: {
            primary: "#006600",
            secondary: "#FFFAEE",
          },
        });
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        return toast.error("Something went wrong", {
          style: {
            border: "1px solid #FF0000",
            borderRadius: "1px",
            padding: "15px",
            color: "#FF0000",
            backgroundColor: "#FFCCCC",
            height: "15%",
            width: "290px",
            fontSize: "1.1rem",
          },
          icon: (
            <div className="animation">
              <FolderSync className="h-6 w-6" />
            </div>
          ),
          iconTheme: {
            primary: "#FF0000",
            secondary: "#FFFAEE",
          },
          duration: 1500,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }

      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Add Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox id="inStock" register={register} label="In the stock?" />
      <div className="w-full font-medium">
        <div className="mb-2 font-extrabold">Select the Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-3">
        <div className="font-extrabold">
          Select the Product color and Upload the images
        </div>
        <div className="text-sm text-slate-400">
          Upload the image for each color selected otherwise your color
          selection will be ignored.
        </div>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageToState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
        disabled={false}
        outline={false}
        small={false}
      />
    </>
  );
};

export default AddProductForm;
