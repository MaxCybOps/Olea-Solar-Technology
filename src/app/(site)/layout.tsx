import { ViewTransition } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import AIChat from "@/components/site/AIChat";
import CartDrawer from "@/components/site/CartDrawer";
import SplashScreen from "@/components/site/SplashScreen";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main className="flex-1">
        <ViewTransition default="page-fade">{children}</ViewTransition>
      </main>
      <Footer />
      <AIChat />
      <CartDrawer />
    </>
  );
}
