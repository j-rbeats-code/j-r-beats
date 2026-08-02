import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { CartUIProvider } from "./context/CartUIContext";


export const metadata: Metadata = {
  title: "J-R Beats",
  description: "Beats professionnels pour artistes",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr">

      <body>

        <CartUIProvider>

          <CartProvider>

            {children}

          </CartProvider>

        </CartUIProvider>

      </body>

    </html>
  );
}