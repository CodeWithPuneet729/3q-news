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

export const metadata = {
  title: "3Q NEWS | Quick, Quality, Quest",
  description: "Stay updated with the latest news from India and the World. Categorized news in multiple languages including Technology, Sports, and Business.",
  keywords: ["News, India News, World News, Technology News, Sports News, Business News, Multilingual News, Quick News, Quality News"],
  authors: [{ name: "CodeWithPuneet" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
