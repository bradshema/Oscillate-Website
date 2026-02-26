import Hero from '@/components/Hero'
import About from '@/components/About'
import Expertise from '@/components/Expertise'
import Experience from '@/components/Experience'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-transparent selection:bg-o_emerald-500/30 selection:text-obsidian-900">
      <Hero />
      <About />
      <Expertise />
      <Experience />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
