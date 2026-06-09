import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drei Dinge",
  description: "Dein Fokus für heute",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Drei Dinge",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

// Inline script prevents flash of wrong theme before React hydrates
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('drei-dinge-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-stone-50 text-stone-900 transition-colors dark:bg-stone-950 dark:text-stone-50">
        {children}
      </body>
    </html>
  );
}
