import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Twitter, Send } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "swapWallet - Secure Crypto Management",
  description: "Pre-register for swapWallet, the most secure crypto wallet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <div className="flex-grow">
          {children}
        </div>

        <footer className="w-full py-6 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-textSecondary text-sm">
              © {new Date().getFullYear()} swapWallet. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <Twitter className="w-4 h-4" />
                @swap_wallet
              </a>
              <a href="#" className="text-textSecondary hover:text-secondary transition-colors flex items-center gap-2 text-sm">
                <Send className="w-4 h-4" />
                Telegram
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

