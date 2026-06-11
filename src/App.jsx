import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Category from './components/Category/Category'
import Packages from './components/Packages/Packages'
import MultistepForm from './components/Forms/MultistepForm/MultistepForm'
import Hotels from './components/Hotels/Hotels'
import Testimonials from './components/Testimonials/Testimonials'
import Spiritual from './components/Spiritual/Spiritual'
import Footer from './components/Footer/Footer'

// import Faq from './components/Faq/Faq'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="App">
      <Header onBookNow={() => setIsFormOpen(true)} />
      <Hero />
      <Category />
      <Packages />
      <Spiritual />
      {/* <Faq /> */}
      <Hotels />
      <Testimonials />
      <Footer />
      <MultistepForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  )
}

export default App
