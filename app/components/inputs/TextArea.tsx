"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  hasPasswordMismatch?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  hasPasswordMismatch,
}) => {
  const hasError =
    errors[id] || (hasPasswordMismatch && id === "confirmPassword");

  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        autoComplete="off"
        className={`peer h-[60px] w-full p-4 pt-6 max-h-[130px] min-h-[130px] outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          hasError ? "border-rose-600 shake" : "border-slate-200"
        } ${hasError ? "focus:border-rose-400" : "focus-border-slate-300"}`}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-sm duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          hasError ? "text-rose-400" : "text-slate-300"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
