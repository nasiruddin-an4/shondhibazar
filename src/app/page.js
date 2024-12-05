import CommunityFarmers from "@/components/CommunityFarmers/CommunityFarmers";
import CategorySection from "@/components/Home/CategorySection/CategorySection";
import HeroContainer from "@/components/Home/Hero/HeroContainer";
import SafeFoodEndeavor from "@/components/Home/SafeFoodEndeavor/SafeFoodEndeavor";
import SignatureItems from "@/components/Home/SignatureItems/SignatureItems";

export default function Home() {
  return (
    <div>
      <HeroContainer />
      <CategorySection />
      <SignatureItems />
      <SafeFoodEndeavor />
      <CommunityFarmers />
    </div>
  );
}
