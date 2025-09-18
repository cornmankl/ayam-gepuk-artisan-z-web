import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayam Gepuk Artisan - Rasa Ayam Gepuk Sebenar",
  description: "Experience the authentic taste of Ayam Gepuk at Ayam Gepuk Artisan. We serve the best smashed fried chicken with traditional recipes and premium ingredients.",
  keywords: ["Ayam Gepuk", "Ayam Gepuk Artisan", "Fried Chicken", "Malaysian Food", "Restaurant", "Halal Food"],
  authors: [{ name: "Ayam Gepuk Artisan" }],
  openGraph: {
    title: "Ayam Gepuk Artisan - Rasa Ayam Gepuk Sebenar",
    description: "Experience the authentic taste of Ayam Gepuk at Ayam Gepuk Artisan",
    url: "https://ayamgepuartisan.com",
    siteName: "Ayam Gepuk Artisan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayam Gepuk Artisan - Rasa Ayam Gepuk Sebenar",
    description: "Experience the authentic taste of Ayam Gepuk at Ayam Gepuk Artisan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
