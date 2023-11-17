"use client";

import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import {
  BookLock,
  FolderSync,
  Loader,
  MailWarning,
  UserCheck2,
  UserX2,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
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
            <MdNoEncryptionGmailerrorred className="h-6 w-6" />
          </div>
        ),
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

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

    try {
      await axios.post("/api/register", data);

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        toast.dismiss(loadingToast);

        if (callback?.ok) {
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
    } catch (error) {
      setIsLoading(false);

      toast.dismiss(loadingToast);

      toast.error("Error creating account", {
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

  if (currentUser) {
    return <p className="text-center redirecting text-base">Redirecting...</p>;
  }

  return (
    <>
      <Heading title="Sign Up" />
      <hr className="bg-slate-500 w-full h-[1.1px]" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        hasPasswordMismatch={password !== confirmPassword}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        hasPasswordMismatch={password !== confirmPassword}
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
        Already have an account?{" "}
        <Link className="underline text-sky-700" href="/login">
          Log In
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
