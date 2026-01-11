import "./globals.css";
import { Metadata } from "next";
import AppProvidersWrapper from "./providers/AppProvidersWrapper";
import {CartProvider} from "./context/CartContext";


export const metadata: Metadata = {
  title: {
    template: '%s | achat rapide et securisee',
    default: 'Allbiz',
  },
  description: 'Plateforme investissement securise .',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <head />
      <body>
      <AppProvidersWrapper>
          <CartProvider>
        {children}
          </CartProvider>
      </AppProvidersWrapper>
      </body>
      </html>
  );
}
