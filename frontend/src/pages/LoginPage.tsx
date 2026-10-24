import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Icon } from "../components/Icon";
import { CardArtwork } from "../components/CardArtwork";
import { CoinBackground } from "../components/CoinBackground";

function desktopScale() {
  return Math.min(Math.max(window.innerWidth, 1024) / 1440, window.innerHeight / 922);
}

export function LoginPage() {
  const [scale, setScale] = useState(desktopScale);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [warnings, setWarnings] = useState<{ email?: string; password?: string }>({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const resize = () => setScale(desktopScale());
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWarnings({
      email: !email.trim()
        ? "Enter your email address."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
          ? "Enter a valid email address."
          : undefined,
      password: !password ? "Enter your password." : undefined,
    });
    setNotice("");
    // Validation is local. Authentication will be added with the backend.
  }

  return (
    <main className="login-screen min-h-dvh" aria-label="Coup sign in">
      <div className="login-scene" style={{ transform: "translate(-50%, -50%) scale(" + scale + ")" }}>
        <CoinBackground />
        <CardArtwork />
        <section className={["login-panel", warnings.email && "has-email-warning", warnings.password && "has-password-warning"].filter(Boolean).join(" ")} aria-labelledby="login-heading">
          <img className="coup-emblem select-none" src="/assets/coup-emblem.svg" alt="" draggable="false" />
          <h1 id="login-heading">Welcome to COUP</h1>
          <p className="login-subtitle">Zero trust. Log in to play.</p>
          <form onSubmit={submit} noValidate aria-label="Sign in">
            <div className={"credential-field email-field" + (warnings.email ? " has-warning" : "")}>
              <label className="sr-only" htmlFor="login-email">Email address</label>
              <Icon name="mail" className="field-icon" />
              <input
                id="login-email" name="email" type="email" autoComplete="username"
                autoCapitalize="none" spellCheck={false} placeholder="Email Address"
                value={email}
                aria-invalid={warnings.email ? true : undefined}
                aria-describedby={warnings.email ? "email-warning" : undefined}
                onChange={event => {
                  setEmail(event.target.value);
                  setWarnings(current => ({ ...current, email: undefined }));
                }}
              />
              {warnings.email && <span className="field-warning" id="email-warning" role="alert"><Icon name="warning" />{warnings.email}</span>}
            </div>
            <div className={"credential-field password-field" + (warnings.password ? " has-warning" : "")}>
              <label className="sr-only" htmlFor="login-password">Password</label>
              <Icon name="lock" className="field-icon" />
              <input
                id="login-password" name="password" type={passwordVisible ? "text" : "password"}
                autoComplete="current-password" placeholder="Password"
                value={password}
                aria-invalid={warnings.password ? true : undefined}
                aria-describedby={warnings.password ? "password-warning" : undefined}
                onChange={event => {
                  setPassword(event.target.value);
                  setWarnings(current => ({ ...current, password: undefined }));
                }}
              />
              <button
                className="password-toggle" type="button"
                aria-label={passwordVisible ? "Hide password" : "Show password"} aria-pressed={passwordVisible}
                onClick={() => setPasswordVisible(visible => !visible)}
              >
                <Icon name={passwordVisible ? "eye-off" : "eye"} />
              </button>
              {warnings.password && <span className="field-warning" id="password-warning" role="alert"><Icon name="warning" />{warnings.password}</span>}
            </div>
            <a className="forgot-password text-link" href="/forgot-password" onClick={event => {
              event.preventDefault();
              setNotice("Password recovery is not available yet.");
            }}>Forgot your password?</a>
            <button className="sign-in-button" type="submit">
              <span>Sign in</span>
            </button>
          </form>
          <p className="signup-prompt">New to Coup? <a className="signup-link text-link" href="/register" onClick={event => {
            event.preventDefault();
            setNotice("Registration is not available yet.");
          }}>Sign up</a></p>
          <p className="feature-notice" role="status" aria-live="polite">{notice}</p>
        </section>
      </div>
    </main>
  );
}
