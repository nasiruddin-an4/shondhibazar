import localFont from "next/font/local";
import "./globals.css";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import FooterContainer from "@/components/Footer/FooterContainer";
import { Providers } from "../redux/provider";
import { Poppins } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata = {
  title: "ShondhiBazar - Your Trusted Online Grocery Store",
  keywords:
    "online grocery, fresh produce, safe food, artisan products, community farmers, sustainable shopping",
  authors: [{ name: "ShondhiBazar Team", url: "https://shondhibazar.com" }],
  creator: "ShondhiBazar Team",
  openGraph: {
    title: "ShondhiBazar - Your Trusted Online Grocery Store",
    description:
      "Discover fresh produce, artisan products, and safe food from community farmers. Shop sustainably with ShondhiBazar.",
    url: "https://shondhibazar.com",
    siteName: "ShondhiBazar",
    images: [
      {
        url: "https://shondhibazar.com/wp-content/uploads/2021/04/shondhibazar-logo14.png",
        width: 1200,
        height: 630,
        alt: "ShondhiBazar - Your Trusted Online Grocery Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  description:
    "ShondhiBazar is your trusted online grocery store, offering fresh produce, artisan products, and safe food sourced from community farmers. Shop sustainably and support local agriculture.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": "-1",
    "max-video-preview": "-1",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable} ${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NavbarWrapper />
          {children}
          <FooterContainer />
        </Providers>
      </body>
    </html>
  );
}
