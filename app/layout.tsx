import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Fira_Code,
  IBM_Plex_Mono,
  Source_Code_Pro,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const firaCode = Fira_Code({ variable: "--font-fira-code", subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ variable: "--font-source-code-pro", subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  jetbrainsMono.variable,
  firaCode.variable,
  sourceCodePro.variable,
  ibmPlexMono.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Glaze — Beautiful code snippets",
  description:
    "A fully client-side studio for turning code into gorgeous, shareable images. Syntax themes, window styling, custom copy buttons, gradients and mesh backgrounds.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
