import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
              Top Link Technology
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="btn btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-secondary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Welcome to Top Link Technology
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4 sm:mb-6">
            Internal Asset Management System
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Streamline your internal asset management with our comprehensive system designed 
            specifically for Top Link Technology employees. Request, track, and manage company 
            assets efficiently.
          </p>
          <div className="button-container">
            <Link to="/register" className="btn btn-primary hero-btn">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary hero-btn">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Internal Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="card text-center">
              <div className="text-3xl sm:text-4xl mb-4">📱</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Employee Asset Requests</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Top Link Technology employees can easily request company assets through our intuitive interface
              </p>
            </div>
            <div className="card text-center">
              <div className="text-3xl sm:text-4xl mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Quick Admin Approval</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Management can approve or reject asset requests with just a few clicks
              </p>
            </div>
            <div className="card text-center sm:col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl mb-4">📊</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Internal Asset Tracking</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Track asset status, history, and usage across Top Link Technology departments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="container px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm sm:text-base">&copy; 2024 Top Link Technology. Internal Asset Management System.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 