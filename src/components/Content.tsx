import TopProducts from "./TopProducts";
import { Benefit } from "./Benefit";
import Header from "@/components/Header";
import FAQ from "./FAQ";
import { BestSelling } from "./BestSelling";
import OffersCarousel from "./OffersCarousel";
import Testimonials from "./Testimonials ";
import Footer from "./Footer";

function Content() {
  return (
    <div>
      <Header />
      <OffersCarousel />
      <BestSelling />
      <Benefit />
      <TopProducts />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Content;
