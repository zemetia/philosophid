import React from "react";
import { DashboardTemplate } from "../../components/templates/DashboardTemplate";

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}

