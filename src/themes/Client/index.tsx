import { useEffect, useState, lazy } from "react";
import Navbar from "./Header/Navbar";
const Footer = lazy(() => import("./Footer/Footer"));
const ClientHeader = lazy(() => import("./Header"));

type ClientLayoutProps = {
  children: any;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setOffsetTop(window.scrollY);
    });
  }, []);
  return (
    <div className=" min-h-screen bg-black absolute top-0 w-full text-white">
      <Navbar />
      {/* <ClientHeader /> */}
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
