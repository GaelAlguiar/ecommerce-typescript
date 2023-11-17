"use client";

import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FolderSync, Loader, UserCheck2 } from "lucide-react";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);

  const password = watch("password");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const loadingToast = toast.loading("This can take a while...", {
      style: {
        border: "1px solid #0026A3",
        borderRadius: "1px",
        padding: "15px",
        color: "#000566",
        backgroundColor: "#E0E2ff",
        height: "15%",
        width: "250px",
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

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      toast.dismiss(loadingToast);

      if (callback?.error) {
        toast.error("Invalid email or password", {
          style: {
            border: "1px solid #FF0000",
            borderRadius: "1px",
            padding: "15px",
            color: "#FF0000",
            backgroundColor: "#FFCCCC",
            height: "15%",
            width: "270px",
            fontSize: "1.1rem",
          },
          icon: (
            <div className="animation">
              <MdNoEncryptionGmailerrorred className="h-6 w-6" />
            </div>
          ),
          iconTheme: {
            primary: "#FF0000",
            secondary: "#FFFAEE",
          },
        });
      } else if (callback?.ok) {
        router.push("/");
        router.refresh();

        toast.success("Logged in.", {
          style: {
            border: "1px solid #00A33A",
            borderRadius: "1px",
            padding: "15px",
            color: "#006600",
            backgroundColor: "#E0FFE0",
            height: "15%",
            width: "190px",
            fontSize: "1.1rem",
          },
          icon: (
            <div className="animation">
              <UserCheck2 width={25} height={25} />
            </div>
          ),
          iconTheme: {
            primary: "#006600",
            secondary: "#FFFAEE",
          },
        });
      }
    });
  };

  if (currentUser) {
    return <p className="text-center redirecting text-base">Redirecting...</p>;
  }

  return (
    <>
      <Heading title="Log In" />
      <hr className="bg-slate-500 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />

      <Button
        label={"Google"}
        disabled={false}
        outline={true}
        small={true}
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Button
        label={isLoading ? "Loading" : "Continue"}
        onClick={handleSubmit(onSubmit)}
        disabled={false}
        outline={false}
        small={false}
      />
      <p className="text-sm text-slate-400">
        Do you have an account already?{" "}
        <Link className="underline text-sky-700" href="/register">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
