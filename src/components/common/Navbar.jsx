import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`z-50 w-full h-20 justify-between bg-zinc-300 flex items-center p-7 relative ${isMenuOpen?'':'border-blue-500 border-b-1'}`}>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold'>Virtual Voting System</h2>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-3'>
            {['Home', 'Login', 'Apply', 'Vote Now'].map((item,idx)=>{
                if (item != 'Vote Now'){
                    return <a key={idx} href="#" className='bg-zinc-600 text-white px-4 py-2 rounded-md border-2 border-blue-500 border-b-2 hover:border-b-0 hover:border-t-4 border-r-0 border-l-0'>{item}</a>
                }else{
                    return <a key={idx} href="#" className='bg-zinc-800 text-white px-4 py-2 rounded-md border-2 border-blue-500 border-b-2 hover:border-b-0 hover:border-t-4 border-r-0 border-l-0'>{item}</a>
                }
            })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className='md:hidden flex flex-col gap-1 p-2'
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-zinc-800 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-zinc-800 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-zinc-800 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`md:hidden absolute top-20 left-0 w-full bg-zinc-300 border-b-1 border-blue-600 transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className='flex flex-col gap-2 p-4'>
                {['Home', 'Login', 'Apply', 'Vote Now'].map((item,idx)=>{
                    if (item != 'Vote Now'){
                        return <a key={idx} href="#" className='bg-zinc-600 text-white px-4 py-3 rounded-md border-2 border-blue-500 border-b-2 hover:border-b-0 hover:border-t-4 border-r-0 border-l-0 text-center'>{item}</a>
                    }else{
                        return <a key={idx} href="#" className='bg-zinc-800 text-white px-4 py-3 rounded-md border-2 border-blue-500 border-b-2 hover:border-b-0 hover:border-t-4 border-r-0 border-l-0 text-center'>{item}</a>
                    }
                })}
            </div>
        </nav>
    </header>
  )
}

export default Navbar