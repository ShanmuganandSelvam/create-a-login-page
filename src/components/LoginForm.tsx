import { useState, FormEvent } from 'react'
import './LoginForm.css'

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({
      email: '',
      password: ''
    })

    // Validate inputs
    let isValid = true
    
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }))
      isValid = false
    } else if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      isValid = false
    }

    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }))
      isValid = false
    } else if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }))
      isValid = false
    }

    if (isValid) {
      onLogin(email, password)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className="form-group remember-me">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>
          
          <button type="submit" className="login-button">Sign in</button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm