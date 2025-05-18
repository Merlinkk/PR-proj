import { HeroSection } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/Services';
import { ClientsSection } from '@/components/sections/Clients';
import { TeamSection } from '@/components/sections/Team';
import { ProjectsSection } from '@/components/sections/Projects';
import { ContactSection } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ClientsSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
}