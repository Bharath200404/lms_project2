import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/ui/AuthContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
 });

export const metadata: Metadata = {
  title: "FutureSkills Academy - Learn Future Skills Online",
  description: "Master technology with curated courses from FutureSkills Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pb-24">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
