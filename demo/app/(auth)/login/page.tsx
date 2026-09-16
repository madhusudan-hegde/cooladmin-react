import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export const metadata = { title: 'Sign in' }

/** CoolAdmin login.html — presentational only. */
export default function LoginPage() {
  return (
    <>
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-subtitle">Sign in to continue to your dashboard.</p>

      <AuthForm aria-label="Sign in">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            className="au-input"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="au-input"
            type="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="login-checkbox">
          <label>
            <input type="checkbox" name="remember" />
            Remember me
          </label>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
        <button className="au-btn au-btn--green" type="submit">
          Sign in
        </button>

        <div className="social-login-content">
          <div className="social-button">
            <button className="au-btn au-btn--blue" type="button">
              <i className="fa-brands fa-google" aria-hidden="true" /> Continue with Google
            </button>
            <button className="au-btn au-btn--blue2" type="button">
              <i className="fa-brands fa-github" aria-hidden="true" /> Continue with GitHub
            </button>
          </div>
        </div>
      </AuthForm>

      <div className="register-link">
        <p>
          Don&rsquo;t have an account? <Link href="/register">Create one</Link>
        </p>
      </div>
    </>
  )
}
