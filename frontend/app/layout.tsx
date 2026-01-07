import { Toaster } from 'sonner';
import { Outfit, Merriweather, Source_Code_Pro } from "next/font/google";
import './globals.css'
import Header from "./Header";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit", // <--- Remembers this name
});

const merriweather = Merriweather({
    weight: ["300", "400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-merriweather",
});

const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    variable: "--font-source-code",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${outfit.variable} ${merriweather.variable} ${sourceCodePro.variable} antialiased`}
      >
          <body>
              <main>
                  <Header></Header>
                  {children}
              </main>
              <Toaster />
          </body>
      </html>
  );
}
