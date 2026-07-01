import type { Metadata } from 'next';
import LandingNavbar from '@/components/landing/navbarLanding';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PopularTemplatesSection from '@/components/landing/PopularTemplatesSection'; // <-- IMPORT BARU
import StatsSection from '@/components/landing/StatsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

// Metadata untuk SEO
export const metadata: Metadata = {
  title: 'Templas - Temukan & Download Template Terbaik',
  description:
    'Koleksi template profesional untuk website, presentasi, UI/UX, dan desain grafis. Hemat waktu dan tingkatkan produktivitasmu.',
  keywords: ['template', 'desain', 'ui/ux', 'download template', 'templas'],
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <LandingNavbar />
      <HeroSection />
      <PopularTemplatesSection />
      <Footer />
    </main>
  );
}
