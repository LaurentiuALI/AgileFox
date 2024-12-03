import { ThemeProvider, QueryProvider } from "@/util/providers";
import "./globals.css";
import Navigation from "@/components/molecules/navigation";
import SessionWrapper from "@/components/molecules/SessionWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <html>
        <body className="w-screen h-screen flex flex-col">
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              <Navigation />
              <main className="flex-1">{children}</main>
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
