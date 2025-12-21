import React from 'react'
import { useUser } from '../context/user.context'

const Home = () => {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome Home</h1>
        {user ? (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-300">No user logged in</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
