import "./globals.css";
import type { Metadata } from "next";
import { Tomorrow } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights as needed (Tomorrow supports 400, 700, etc.)
});

export const metadata: Metadata = {
  title: "Github Portfolio Analyzer",
  description: "Analyze and visualize GitHub user portfolios with ease. Made with Next.js and TypeScript. by ifte-13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${tomorrow.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
