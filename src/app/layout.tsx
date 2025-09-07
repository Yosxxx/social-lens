import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { GeistSans } from "geist/font/sans";
import ThemedBackground from "@/components/theme/theme-background";
import Footer from "@/components/footer";
import ThemeToggleButton from "@/components/theme/theme-toggle-btn";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="transition">
        <ThemeProvider>
          <ThemedBackground>
            <span className="fixed top-5 right-5">
              <ThemeToggleButton />
            </span>
            <ToastContainer position="top-right" autoClose={3000} />
            <main className="flex-1 ">{children}</main>
            <Footer />
          </ThemedBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
