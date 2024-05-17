"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const AuthSession = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSession;
