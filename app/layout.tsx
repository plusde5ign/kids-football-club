import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A.C.S. Golden Kids Brașov | Fotbal pentru copii",
  description: "A.C.S. Golden Kids Brașov, antrenamente de fotbal pentru copii din grupele 2012-2021. Disciplină, încredere și spirit de echipă.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head><link rel="preload" href="/fonts/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2_3E.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /><link rel="preload" href="/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
