import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";

export const metadata: Metadata = {
  title: "VedaAI",
  description: "AI Assessment Creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen transition-colors duration-300">
        <Providers>
          <div className="print:hidden">
            <Toaster position="bottom-right" /> 
          </div>

          <div className="flex flex-col min-h-screen">
            <div className="print:hidden">
              <Header />
            </div>
            
            <main className="flex-1 print:bg-white print:p-0">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}