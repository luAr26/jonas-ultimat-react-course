/** @format */

import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
};

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-primary-950 text-primary-100'>
        <Logo />
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis.</footer>
      </body>
    </html>
  );
}

export default RootLayout;
