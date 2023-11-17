"use client";

import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType | LucideIcon;
  onClick: (string: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-400 transition cursor-pointer ${
        selected ? "border-slate-400" : "border-slate-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
