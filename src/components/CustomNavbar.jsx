"use client";

import UserContext from "@/app/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const CustomNavbar = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  const doLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
      context.setUser(undefined);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("logout error");
    }
  };

  return (
    <nav className="bg-blue-500 h-16 py-2 px-32 flex justify-between items-center">
      <div className="brand">
        <h1 className="text-3xl font-bold">
          <Link href="/">Work Manager</Link>
        </h1>
      </div>
      <div>
        <ul className="flex space-x-5 items-center">
          {context.user && (
            <>
              <li>
                <Link href={"/"} className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/add-task"} className="hover:text-blue-400">
                  Add task
                </Link>
              </li>
              <li>
                <Link href={"/show-task"} className="hover:text-blue-400">
                  Show Tasks
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-5 items-center">
          {context.user && (
            <>
              <li>
                <Link href={"#!"} className="hover:text-blue-400">
                  {context.user.name}
                </Link>
              </li>
              <button>
                <Link
                  href={"#!"}
                  onClick={doLogout}
                  className="hover:text-blue-400"
                >
                  Logout
                </Link>
              </button>
            </>
          )}
          {!context.user && (
            <>
              <li>
                <Link href="/login" className="hover:text-blue-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-blue-400">
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
