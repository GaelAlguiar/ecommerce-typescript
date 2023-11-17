"use client";

import { useState } from "react";
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface SelectImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({
  item,
  handleFileChange,
}) => {
  const [progress, setProgress] = useState<number | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      const totalSize = file.size;
      let uploadedSize = 0;

      const uploadInterval = setInterval(() => {
        if (uploadedSize < totalSize) {
          uploadedSize += totalSize / 40;
          const newProgress = Math.min((uploadedSize / totalSize) * 100, 100);
          setProgress(newProgress);
        } else {
          clearInterval(uploadInterval);
          setProgress(null);
          handleFileChange(file);
        }
      }, 200);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center w-[90%] mx-auto ${
        progress !== null ? "bg-white" : ""
      }`}
    >
      <input {...getInputProps()} />
      {progress !== null ? (
        <div className="relative w-full h-2 bg-slate-100 rounded ">
          <div
            className="absolute top-0 left-0 h-full bg-teal-600 rounded "
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      ) : isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>+ {item?.color} Image</p>
      )}
    </div>
  );
};

export default SelectImage;
