"use client";

export default function ThemedBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Light mode background (radial from top) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none dark:hidden"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #475569 100%)",
        }}
      />

      {/* Dark Horizon Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
