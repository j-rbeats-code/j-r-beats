import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BeatShop from "./components/BeatShop";
import LicenseShop from "./components/LicenseShop";
import ExclusiveShop from "./components/ExclusiveShop";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CartOverlay from "./components/CartOverlay";
import CartDrawer from "./components/CartDrawer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <BeatShop />

      <LicenseShop />

      <ExclusiveShop />

      <AboutSection />

      <ContactSection />

      <CartOverlay />

      <CartDrawer />
    </main>
  );
}