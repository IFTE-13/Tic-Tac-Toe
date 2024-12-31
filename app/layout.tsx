import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe is a classic two-player game implemented using modern web development tools. This application offers a simple, interactive, and visually engaging interface where players can compete by marking Xs and Os in a 3x3 grid to achieve three in a row. Built with Next.js, it ensures fast and responsive gameplay, providing a smooth user experience. Whether you're a casual gamer or a developer exploring React and Next.js, this project serves as both entertainment and inspiration. Enjoy the nostalgia of Tic Tac Toe with a modern twist, optimized for seamless performance and compatibility across devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
