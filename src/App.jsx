import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Category from './components/Category/Category'
import Packages from './components/Packages/Packages'
import MultistepForm from './components/Forms/MultistepForm/MultistepForm'
import Hotels from './components/Hotels/Hotels'
import Testimonials from './components/Testimonials/Testimonials'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Spiritual from './components/Spiritual/Spiritual'
import Blog from './components/Blog/Blog'
import Footer from './components/Footer/Footer'

import Faq from './components/Faq/Faq'
import Gallery from './components/Gallery/Gallery'
import Newsletter from './components/Newsletter/Newsletter'
import SearchBar from './components/SearchBar/SearchBar'
import Destinations from './components/Destinations/Destinations'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="App">
      <Header onBookNow={() => setIsFormOpen(true)} />
      <Hero />
      <SearchBar />
      <Category />
      <Destinations />
      <Packages />
      <Spiritual />
      <Blog />
      <Hotels />
      <Testimonials />
      <Gallery />
      <WhyChooseUs />
      <Faq />
      <Newsletter />
      <Footer />
      <MultistepForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  )
}

export default App
