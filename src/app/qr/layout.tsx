import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code - Newsletter",
  description:
    "Scanne den QR-Code und melde dich zum Vinogang Newsletter an.",
};

export default function QRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
