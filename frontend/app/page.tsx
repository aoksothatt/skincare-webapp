import { getHomepage } from "@/lib/api";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default async function HomePage() {
  const data = await getHomepage();

  return (
    <div className="hero-glow-bg min-h-screen flex flex-col overflow-x-hidden max-w-full">
      <SiteHeader />
      <main className="flex-1 flex flex-col justify-center">
        <Hero data={data} />
      </main>
      <SiteFooter />
    </div>
  );
}
