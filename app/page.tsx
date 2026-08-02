import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BeatShop from "./components/BeatShop";
import LicenseShop from "./components/LicenseShop";
import CartOverlay from "./components/CartOverlay";
import CartDrawer from "./components/CartDrawer";


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <Hero />

      <BeatShop />

      <LicenseShop />

      <CartOverlay />

      <CartDrawer />

    </main>
  );
}