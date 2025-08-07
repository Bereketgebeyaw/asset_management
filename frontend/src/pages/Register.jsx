import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerOnly } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await registerOnly(email, password);
      setSuccess('Account created successfully! You will be redirected to the login page in 2 seconds.');
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="card register-card">
          <div className="text-center mb-6 sm:mb-8">
            <div className="register-icon mb-4">
              <span className="text-4xl sm:text-5xl">📝</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-sm sm:text-base text-gray-600">Join Top Link Technology Asset Management</p>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3 sm:py-4 text-base sm:text-lg font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="loading-spinner mr-2"></span>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2 text-sm sm:text-base">Demo Credentials:</h3>
            <div className="text-xs sm:text-sm space-y-1">
              <p><strong>Admin:</strong> admin@company.com / admin123</p>
              <p><strong>User:</strong> user@company.com / user123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 