import Hero from '@/components/Hero'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-transparent">
      <Hero />
      <About />
      <Portfolio />
      <Footer />
    </main>
  );
}
