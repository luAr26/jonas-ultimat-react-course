/** @format */

import Header from "@/app/_components/Header";
import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";

// Load the Josefin Sans font and configure it
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

// Metadata for the layout
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
        className={`${josefin.className} min-h-screen bg-primary-950 text-primary-100 flex flex-col antialiased`}
      >
        <Header />
        <div className='grid flex-1 px-8 py-12'>
          <main className='w-full mx-auto max-w-7xl'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
