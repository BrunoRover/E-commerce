import TopProducts from "./TopProducts";
import { Benefit } from "./Benefit";
import FAQ from "./Faq";
import { BestSelling } from "./BestSelling";
import OffersCarousel from "./OffersCarousel";
import Testimonials from "./Testimonials ";

function Content() {
  return (
    <div>
      <OffersCarousel />
      <BestSelling />
      <Benefit />
      <TopProducts />
      <Testimonials />
      <FAQ />
    </div>
  );
}

export default Content;
