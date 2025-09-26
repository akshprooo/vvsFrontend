import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-black/95 text-white overflow-x-hidden">
      <div className="w-full max-w-full p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          
          {/* Brand / Project Intro */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-2">
                Virtual Voting System
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A personal project built to explore secure, transparent, and user-friendly digital voting concepts.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/akshprooo" target="_blank" rel="noopener noreferrer" className="px-2 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center hover:bg-blue-400/30 transition-colors duration-200">
                <span className="text-sm">Github</span>
              </a>
              <a href="https://www.akshprooo.vercel.app" target="_blank" rel="noopener noreferrer" className="px-2 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center hover:bg-blue-400/30 transition-colors duration-200">
                <span className="text-sm">Portfolio</span>
              </a>
              <a href="mailto:akshprooo@gmail.com" className="px-2 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center hover:bg-blue-400/30 transition-colors duration-200">
                <span className="text-sm">Mail</span>
              </a>
            </div>
          </div>

          {/* Project Links */}
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4">Project</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm sm:text-base text-white/80 hover:text-blue-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              
            </ul>
          </div>

          {/* Support / Info */}
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/akshprooo" className="text-sm sm:text-base text-white/80 hover:text-blue-400 transition-colors duration-200">
                  About This Project
                </a>
              </li>
              
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4">Disclaimer</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              This Virtual Voting System is a personal portfolio project created for learning and demonstration purposes only. It is not affiliated with or endorsed by the Election Commission of India or any government body.
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/20 mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm text-white/70">
              © {new Date().getFullYear()} Virtual Voting System — Built by Aksh.
            </p>
            <p className="text-xs text-white/60 mt-1">
              Exploring secure digital voting through code & design.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-white/60">
              v1.0.0 (Portfolio Edition)
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
