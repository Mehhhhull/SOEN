import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/user.context'
import axios from '../config/axios'

const Register = () => {
  const navigate = useNavigate()
  const { register, loading, error: contextError } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    try {
      await register({ email, password })
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed')
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/60 backdrop-blur rounded-xl shadow-lg ring-1 ring-white/5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <p className="text-sm text-gray-300 mt-1">Sign up for a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {(error || contextError) && (
            <div className="text-sm text-red-400 bg-red-900/30 p-2 rounded">
              {error || contextError?.message || 'An error occurred'}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your password"
                required
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-200"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 accent-indigo-500" />
              <span className="text-gray-300">Remember me</span>
            </label>
            <Link to="/forgot" className="text-indigo-400 hover:text-indigo-300">Forgot?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="pt-4 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
