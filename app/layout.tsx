import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { CartUIProvider } from "./context/CartUIContext";
import { FavoritesProvider } from "./context/FavoritesContext";

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
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </CartUIProvider>
      </body>
    </html>
  );
}