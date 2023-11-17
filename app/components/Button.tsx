"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled: boolean;
  outline: boolean;
  small: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-90 transition w-full border-sky-700 flex items-center justify-center gap-2 ${
        outline ? "bg-white" : "bg-sky-900"
      } ${outline ? "text-sky-700" : "text-white"} ${
        small ? "text-sm font-light" : "text-md font-semibold"
      } ${small ? "py-3 px-2 border-[1.4px]" : "py-3 px-4 border-2"} ${
        custom ? custom : ""
      }`}
    >
      {Icon && <Icon size={25} />}
      {label}
    </button>
  );
};

export default Button;
