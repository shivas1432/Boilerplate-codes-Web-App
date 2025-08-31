import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Categories from '@/components/sections/Categories'
import PopularAPIs from '@/components/sections/PopularAPIs'
import Statistics from '@/components/sections/Statistics'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <PopularAPIs />
      <Statistics />
      <Footer />
    </div>
  )
}