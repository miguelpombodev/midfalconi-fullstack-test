import { Header } from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Epilogue } from "next/font/google";
import { Toaster } from "react-hot-toast";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--garnet",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${epilogue.variable}`}>
      <Header />
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </main>
  );
}
