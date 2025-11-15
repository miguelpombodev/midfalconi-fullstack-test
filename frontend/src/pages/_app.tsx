import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Epilogue } from "next/font/google";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--garnet",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${epilogue.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
