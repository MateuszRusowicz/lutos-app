import { Inter } from "next/font/google";
import { SongsContextProvider } from "./context-hook/useSongsState";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lutos app",
  description: "music management tool of new generation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SongsContextProvider>{children}</SongsContextProvider>
      </body>
    </html>
  );
}
