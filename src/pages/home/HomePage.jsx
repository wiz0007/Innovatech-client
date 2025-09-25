import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Hero from '../../components/hero/Hero'
import Services from '../../components/services/Services'
import Portfolio from '../../components/portfolio/Portfolio'
import About from '../../components/about/About'
import Testimonials from '../../components/testimonials/Testimonials'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import Team from '../../components/team/Team'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Services/>
      <Portfolio/>
      <About/>
      <Team/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      
    </div>
  )
}

export default Home
