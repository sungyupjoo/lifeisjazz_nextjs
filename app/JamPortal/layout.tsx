import { ReactNode } from "react";

export const metadata = {
  title: "Life is Jazz 잼데이",
  description: "라이재 잼데이",
};

interface Props {
  children: ReactNode;
}

export default function JamPortalLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
