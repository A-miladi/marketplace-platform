"use client";

import AdminSideBar from "@/components/screen/admin/components/Sidebar";
import { FC, ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayouts: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="relative z-10 flex h-screen flex-col gap-4 overflow-hidden bg-neutral-50 px-4 py-8 md:flex-row">
      <AdminSideBar />
      <div className="rounded-x flex h-[96%] w-full rounded-xl border border-primary-600 p-2 md:h-full md:w-4/5">
        <div className="flex h-full w-full flex-col items-start justify-start gap-1 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayouts;
