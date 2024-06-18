/** @format */

import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

export const metadata = {
  title: "The Wild Oasis",
};

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Logo />
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis.</footer>
      </body>
    </html>
  );
}

export default RootLayout;
