import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export const metadata = { title: 'Create account' }

/** CoolAdmin register.html — presentational only. */
export default function RegisterPage() {
  return (
    <>
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-subtitle">Start your 14-day free trial. No credit card required.</p>

      <AuthForm aria-label="Create account">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="au-input"
            type="text"
            name="username"
            placeholder="janedoe"
            autoComplete="username"
            required
          />
        </div>
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
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>
        <div className="login-checkbox">
          <label>
            <input type="checkbox" name="agree" required />
            <span>
              I agree to the <a href="#">terms</a> &amp; <a href="#">privacy policy</a>
            </span>
          </label>
        </div>
        <button className="au-btn au-btn--green" type="submit">
          Create account
        </button>

        <div className="social-login-content">
          <div className="social-button">
            <button className="au-btn au-btn--blue" type="button">
              <i className="fa-brands fa-google" aria-hidden="true" /> Sign up with Google
            </button>
            <button className="au-btn au-btn--blue2" type="button">
              <i className="fa-brands fa-github" aria-hidden="true" /> Sign up with GitHub
            </button>
          </div>
        </div>
      </AuthForm>

      <div className="register-link">
        <p>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </>
  )
}
