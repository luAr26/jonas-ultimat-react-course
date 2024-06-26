/** @format */

import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
console.log(josefin);

import "@/app/_styles/globals.css";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome - The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} min-h-screen bg-primary-950 text-primary-100`}
      >
        <Logo />
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis.</footer>
      </body>
    </html>
  );
}

export default RootLayout;
