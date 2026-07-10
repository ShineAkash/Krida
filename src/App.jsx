import React from 'react'
import Hero from './component/Hero'
import About from './component/About'
import Navbar from './component/Navbar'
import Features from './component/Features'
import Story from './component/Story'
import Footer from './component/Footer'
import Cursor from './component/Cursor'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden bg-zinc-600'>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Footer />
    </main>
  )
}

export default App;