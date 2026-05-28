import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

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
    <html lang="en">
      <body className="flex h-screen bg-[#f9fafb]">
        
        {/* 1. Added print:hidden here so Toaster doesn't print */}
        <div className="print:hidden">
          <Toaster position="bottom-right" /> 
        </div>
        
        {/* 2. Added print:hidden here so Sidebar doesn't print */}
        <div className="print:hidden z-10 flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* 3. Added print:hidden here so Header doesn't print */}
          <div className="print:hidden">
            <Header />
          </div>
          
          {/* Main content stays visible for the PDF */}
          <main className="flex-1 overflow-y-auto print:overflow-visible print:bg-white print:p-0">
            {children}
          </main>
        </div>
        
      </body>
    </html>
  );
}