import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academia de Fotbal | Fotbal pentru copii. Caracter pentru viață.",
  description: "Antrenamente de fotbal pentru grupele 2012-2021. Disciplină, încredere și spirit de echipă, într-un mediu sigur și plin de energie.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
