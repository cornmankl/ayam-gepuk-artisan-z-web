import { Navigation } from "@/components/layout/Navigation"
import { HeroSection } from "@/components/home/HeroSection"
import { PromotionsSection } from "@/components/home/PromotionsSection"
import { FeaturedMenu } from "@/components/home/FeaturedMenu"
import { BranchInfo } from "@/components/home/BranchInfo"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-menu-light">
      <Navigation />
      <main>
        <HeroSection />
        <PromotionsSection />
        <FeaturedMenu />
        <BranchInfo />
      </main>
      <Footer />
    </div>
  )
}