import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Camb AI",
  description: "Collaborative Real-Time Audio/Video Analysis and Annotation Platform",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* <header>
          <nav>Real-Time Media Annotation Platform</nav>
        </header> */}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;