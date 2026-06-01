import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Features from './components/Sections/Features'
import Destinations from './components/Sections/Destinations'
import MultistepForm from './components/Forms/MultistepForm/MultistepForm'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="App">
      <Header onBookNow={() => setIsFormOpen(true)} />
      <Hero />
      <Features />
      <Destinations />
      <MultistepForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  )
}

export default App
