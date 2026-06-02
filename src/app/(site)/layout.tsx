import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import AIChat from "@/components/site/AIChat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIChat />
    </>
  );
}
