"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class" // applies "light" or "dark" class on <html>
      defaultTheme="darks" // default follows OS preference
      enableSystem // allow system theme switching
      disableTransitionOnChange // prevents weird flickers
    >
      {children}
    </NextThemesProvider>
  );
}
