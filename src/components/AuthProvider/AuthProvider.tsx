"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useJwt } from "react-jwt";

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { isExpired } = useJwt(token || "");

  useEffect(() => {
    if (!token || isExpired) {
      router.push("/logIn");
    } else {
      router.push("/AdminHome");
    }
  }, [token, isExpired, router]);

  return <>{children}</>;
};

export default AuthProvider;
