"use client";
import { useDoctorStore } from "@/store/doctor.store";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import SkeletonGroup from "./SkeletonGroup";

const Redirect = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const { user, isAdmin, checkAuth, isCheckingUser } = useDoctorStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (path.includes("/login") && user) {
      router.replace("/");
    } else if (path.includes("/signup") && user) {
      router.replace("/");
    } else if (path.includes("/dashboard") && !user) {
      router.replace("/");
    }
  }, [path, user, router]);

  if (isCheckingUser)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <SkeletonGroup />
      </div>
    );

  return <>{children}</>;
};

export default Redirect;
