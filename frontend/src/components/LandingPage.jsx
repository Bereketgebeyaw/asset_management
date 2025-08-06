import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-600">Top Link Technology</div>
            <div className="space-x-4">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Top Link Technology
          </h1>
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            Internal Asset Management System
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your internal asset management with our comprehensive system designed 
            specifically for Top Link Technology employees. Request, track, and manage company 
            assets efficiently.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Internal Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Employee Asset Requests</h3>
              <p className="text-gray-600">
                Top Link Technology employees can easily request company assets through our intuitive interface
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Quick Admin Approval</h3>
              <p className="text-gray-600">
                Management can approve or reject asset requests with just a few clicks
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Internal Asset Tracking</h3>
              <p className="text-gray-600">
                Track asset status, history, and usage across Top Link Technology departments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Access Your Assets?
            </h2>
            <p className="text-blue-100 mb-8">
              Join your colleagues in efficient asset management at Top Link Technology
            </p>
            <Link to="/register" className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Using System
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container">
          <div className="text-center">
            <p>&copy; 2024 Top Link Technology. Internal Asset Management System.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 