import { useEffect, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { CardArtwork } from "../components/CardArtwork";
import { CoinBackground } from "../components/CoinBackground";
import { CredentialField } from "../components/CredentialField";
import { Icon } from "../components/Icon";

// The Figma frame is 1440 x 922. The whole scene scales as one piece and keeps a 1024 px minimum width.
const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 922;
const MIN_WIDTH = 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Warnings = { email?: string; password?: string };

function desktopScale() {
  return Math.min(Math.max(window.innerWidth, MIN_WIDTH) / FRAME_WIDTH, window.innerHeight / FRAME_HEIGHT);
}

// Local checks only. Authentication will be added with the backend.
function findWarnings(email: string, password: string): Warnings {
  const trimmedEmail = email.trim();
  return {
    email: !trimmedEmail
      ? "Enter your email address."
      : !EMAIL_PATTERN.test(trimmedEmail)
        ? "Enter a valid email address."
        : undefined,
    password: password ? undefined : "Enter your password.",
  };
}

export function LoginPage() {
  const [scale, setScale] = useState(desktopScale);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [warnings, setWarnings] = useState<Warnings>({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const resize = () => setScale(desktopScale());
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWarnings(findWarnings(email, password));
    setNotice("");
  }

  function clearWarning(field: keyof Warnings) {
    setWarnings(current => ({ ...current, [field]: undefined }));
  }

  function showNotice(message: string) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setNotice(message);
    };
  }

  const panelClass = ["login-panel", warnings.email && "has-email-warning", warnings.password && "has-password-warning"]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="login-screen min-h-dvh" aria-label="Coup sign in">
      <div className="login-scene" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <CoinBackground sceneScale={scale} />
        <CardArtwork />
        <section className={panelClass} aria-labelledby="login-heading">
          <img className="coup-emblem select-none" src="/assets/coup-emblem.svg" alt="" draggable="false" />
          <h1 id="login-heading">Welcome to COUP</h1>
          <p className="login-subtitle">Zero trust. Log in to play.</p>
          <form onSubmit={submit} noValidate aria-label="Sign in">
            <CredentialField
              id="login-email" name="email" type="email" autoComplete="username"
              autoCapitalize="none" spellCheck={false} placeholder="Email Address"
              label="Email address" icon="mail" warning={warnings.email}
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                clearWarning("email");
              }}
            />
            <CredentialField
              id="login-password" name="password" type={passwordVisible ? "text" : "password"}
              autoComplete="current-password" placeholder="Password"
              label="Password" icon="lock" warning={warnings.password}
              value={password}
              onChange={event => {
                setPassword(event.target.value);
                clearWarning("password");
              }}
            >
              <button
                className="password-toggle" type="button"
                aria-label={passwordVisible ? "Hide password" : "Show password"} aria-pressed={passwordVisible}
                onClick={() => setPasswordVisible(visible => !visible)}
              >
                <Icon name={passwordVisible ? "eye-off" : "eye"} />
              </button>
            </CredentialField>
            <a className="forgot-password text-link" href="/forgot-password" onClick={showNotice("Password recovery is not available yet.")}>
              Forgot your password?
            </a>
            <button className="sign-in-button" type="submit">
              <span>Sign in</span>
            </button>
          </form>
          <p className="signup-prompt">
            New to Coup? <a className="signup-link text-link" href="/register" onClick={showNotice("Registration is not available yet.")}>Sign up</a>
          </p>
          <p className="feature-notice" role="status" aria-live="polite">{notice}</p>
        </section>
      </div>
    </main>
  );
}
