import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="transition-all duration-200 ease-in-out ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster></Toaster>
        </ThemeProvider>
      </body>
    </html>
  );
}
