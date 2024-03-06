import { Inter } from "next/font/google";
import "./globals.css";
/* IMPORTACION ESTILO MUY IMPORTANTE!!!!!!!!! */


import TopNav from "@/components/navs/TopNav";

import { CookiesProvider } from 'next-client-cookies/server';
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mi App",
  description: "App de pedido de comida a domicilio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <CookiesProvider>
            <TopNav />
            {children}
          </CookiesProvider>
        </StoreProvider>
      </body>
    </html>
  );
}