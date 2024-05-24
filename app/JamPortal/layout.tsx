"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function JamPortalLayout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
