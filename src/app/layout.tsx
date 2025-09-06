import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { GeistSans } from "geist/font/sans";
import ThemedBackground from "@/components/theme/theme-background";
import Footer from "@/components/footer";

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
            {children} <Footer />
          </ThemedBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
