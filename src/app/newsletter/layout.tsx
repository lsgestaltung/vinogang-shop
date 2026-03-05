import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Melde dich zum Vinogang Newsletter an und sei der Erste, der von neuen Drops, Events und exklusiven Angeboten erfährt.",
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
