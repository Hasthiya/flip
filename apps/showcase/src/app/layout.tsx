import type { Metadata } from "next";
import Script from "next/script";
import {
  Bebas_Neue,
  Inter,
  Space_Mono,
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Raleway,
  Poppins,
  Source_Sans_3,
  Nunito,
  Playfair_Display,
  Merriweather,
  PT_Sans,
  Ubuntu,
  Noto_Sans,
  Work_Sans,
  DM_Sans,
  Manrope,
  Plus_Jakarta_Sans,
  Outfit,
  Sora,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const sourceSansPro = Source_Sans_3({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans-pro",
});

const nunito = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-sans",
});

const ubuntu = Ubuntu({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const notoSans = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const workSans = Work_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const dmSans = DM_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const manrope = Manrope({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const outfit = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const sora = Sora({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    default: "Flip Clock",
    template: "Flip Clock | %s",
  },
  description: "A customizable flip clock countdown React component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable} ${roboto.variable} ${openSans.variable} ${lato.variable} ${montserrat.variable} ${raleway.variable} ${poppins.variable} ${sourceSansPro.variable} ${nunito.variable} ${playfairDisplay.variable} ${merriweather.variable} ${ptSans.variable} ${ubuntu.variable} ${notoSans.variable} ${workSans.variable} ${dmSans.variable} ${manrope.variable} ${plusJakartaSans.variable} ${outfit.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

