"use client";
import { useDoctorStore } from "@/store/doctor.store";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import SkeletonGroup from "./SkeletonGroup";

const Redirect = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const { user, isAdmin,checkAuth,isCheckingUser  } = useDoctorStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingUser)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <SkeletonGroup/>
      </div>
    );
  if (path.includes("/login") && user) return redirect("/");
  if (path.includes("/signup") && user) return redirect("/");
  if (path.includes("/admin") && !isAdmin) return redirect("/");
  return children;
};

export default Redirect;
