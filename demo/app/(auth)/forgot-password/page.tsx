import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export const metadata = { title: 'Reset password' }

/** CoolAdmin forget-pass.html — presentational only. */
export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="auth-title">Reset your password</h1>
      <p className="auth-subtitle">Enter your email and we&rsquo;ll send you a link to reset it.</p>

      <AuthForm
        aria-label="Reset password"
        submitMessage="This is a demo — no reset link was sent."
      >
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
        <button className="au-btn au-btn--green" type="submit">
          Send reset link
        </button>
      </AuthForm>

      <div className="register-link">
        <p>
          Remembered it? <Link href="/login">Back to sign in</Link>
        </p>
      </div>
    </>
  )
}
