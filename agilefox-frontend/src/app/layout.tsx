import { ThemeProvider, QueryProvider } from "@/util/providers";
import "./globals.css";
import Navigation from "@/components/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Navigation />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
