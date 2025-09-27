import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

const Why = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleGetStarted = () => {
    if (user.loggedin) {
      // If logged in, go to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, go to login
      navigate('/login');
    }
  };

  const handleViewDemo = () => {
    // Create a demo experience - you could create a demo route or show a modal
    if (user.loggedin) {
      // If logged in, show their actual voting interface
      navigate('/vote');
    } else {
      navigate('/elections-preview'); // You might want to create this route
      alert('Demo: This would show you a preview of the voting interface. Please login to access the full system.');
      navigate('/login');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full p-2 sm:p-3 bg-gray-50">
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 px-0">
        {/* Accessibility */}
        <div className="bg-black/90 rounded-lg p-3 sm:p-4 text-white max-w-full">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
            <span className="text-lg sm:text-xl">♿</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-400">Universal Accessibility</h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Vote from anywhere in India - no more traveling distances or standing in queues.
          </p>
        </div>

        {/* Security */}
        <div className="bg-black/90 rounded-lg p-3 sm:p-4 text-white max-w-full">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
            <span className="text-lg sm:text-xl">🔒</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-400">Bank-Level Security</h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Advanced encryption and secure authentication ensure your vote is protected and tamper-proof.
          </p>
        </div>

        {/* Transparency */}
        <div className="bg-black/90 rounded-lg p-3 sm:p-4 text-white max-w-full">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
            <span className="text-lg sm:text-xl">🔍</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-400">Complete Transparency</h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Track your vote status and view your voting history. Every vote counts and can be verified.
          </p>
        </div>

        {/* Cost Effective */}
        <div className="bg-black/90 rounded-lg p-3 sm:p-4 text-white max-w-full">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
            <span className="text-lg sm:text-xl">💰</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-400">Cost Efficient</h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Reduce election costs by 70%. No physical infrastructure or massive resources required.
          </p>
        </div>

        {/* Environment Friendly */}
        <div className="bg-black/90 rounded-lg p-3 sm:p-4 text-white max-w-full">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
            <span className="text-lg sm:text-xl">🌱</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-400">Eco-Friendly</h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Zero paper ballots, no transportation emissions. Contribute to a greener India.
          </p>
        </div>

        {/* Faster Results */}
        <div className="bg-black/90 rounded-lg p-3 sm:p-4 text-white max-w-full">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
            <span className="text-lg sm:text-xl">⚡</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-400">Instant Results</h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Get election results within minutes. No more waiting days for results.
          </p>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="min-h-[40vh] w-full">
        <div className='w-full h-full bg-black/90 rounded-xl relative flex flex-col items-center justify-center p-4 lg:p-8 text-center'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight'>
            Ready to Transform <span className='text-blue-400'>Indian Democracy</span>?
          </h2>
          <p className='text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl mb-6 lg:mb-8'>
            Join the digital revolution in voting. Experience secure, transparent, and accessible elections that truly represent the voice of every Indian citizen.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 w-full max-w-md'>
            <button 
              onClick={handleGetStarted}
              className='bg-blue-400 text-white font-semibold text-lg sm:text-xl py-3 px-6 rounded-lg cursor-pointer hover:bg-blue-500 transition-colors duration-200 flex-1'
            >
              {user.loggedin ? 'Go to Dashboard' : 'Get Started'}
            </button>
            <button 
              onClick={handleViewDemo}
              className='bg-white text-blue-600 font-semibold text-lg sm:text-xl py-3 px-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex-1'
            >
              View Demo
            </button>
          </div>
          
          {/* Additional Quick Links */}
          {user.loggedin && (
            <div className='mt-6 flex flex-wrap gap-2 justify-center'>
              <button
                onClick={() => navigate('/vote')}
                className='bg-transparent border border-blue-400 text-blue-400 px-4 py-2 rounded-lg text-sm hover:bg-blue-400 hover:text-white transition-colors duration-200'
              >
                View Elections
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className='bg-transparent border border-blue-400 text-blue-400 px-4 py-2 rounded-lg text-sm hover:bg-blue-400 hover:text-white transition-colors duration-200'
              >
                My Votes
              </button>
              <button
                onClick={scrollToTop}
                className='bg-transparent border border-white text-white px-4 py-2 rounded-lg text-sm hover:bg-white hover:text-black transition-colors duration-200'
              >
                Back to Top
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Why