import TopProducts from "./TopProducts";
import { Benefit } from "./Benefit";
import { BestSelling } from "./BestSelling";
import OffersCarousel from "./OffersCarousel";

function Content() {
  return (
    <div>
      <OffersCarousel />
      <BestSelling />
      <Benefit />
      <TopProducts />
    </div>
  );
}

export default Content;
