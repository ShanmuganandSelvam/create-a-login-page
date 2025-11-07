import { useState } from 'react'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<string | null>(null)

  const handleLogin = (email: string, password: string) => {
    // This is where you would typically make an API call to authenticate
    console.log('Logging in with:', { email, password })
    
    // For demo purposes, we'll just simulate a successful login
    setUser(email)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <div className="welcome-container">
          <div className="welcome-card">
            <h1>Welcome back!</h1>
            <p>You are logged in as <strong>{user}</strong></p>
            <button className="logout-button" onClick={handleLogout}>Log out</button>
          </div>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App