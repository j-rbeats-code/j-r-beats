import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { CartUIProvider } from "./context/CartUIContext";
import { FavoritesProvider } from "./context/FavoritesContext";

export const metadata: Metadata = {
  title: "J-R Beats | Dark Beat & Instrumentales",
  description:
    "Découvrez les instrumentales J-R Beats : des productions sombres, mélodiques et puissantes pour artistes et créateurs. Licences MP3, WAV, Premium et Exclusive.",
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