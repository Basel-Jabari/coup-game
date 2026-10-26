import { useEffect, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { CardArtwork } from "../components/CardArtwork";
import { CoinBackground } from "../components/CoinBackground";
import { CredentialField } from "../components/CredentialField";
import { DesktopScene } from "../components/DesktopScene";
import { PasswordToggle } from "../components/PasswordToggle";
import { linkTo } from "../navigation";
import { emailWarning } from "../validation";

type Warnings = { email?: string; password?: string };

// Local checks only. Authentication will be added with the backend.
function findWarnings(email: string, password: string): Warnings {
  return {
    email: emailWarning(email),
    password: password ? undefined : "Enter your password.",
  };
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [warnings, setWarnings] = useState<Warnings>({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    document.title = "Sign in · Coup";
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

  const panelClass = ["auth-panel login-panel", warnings.email && "has-email-warning", warnings.password && "has-password-warning"]
    .filter(Boolean)
    .join(" ");

  return (
    <DesktopScene frameHeight={922} label="Coup sign in" sceneClass="login-scene">
      <CoinBackground />
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
            <PasswordToggle visible={passwordVisible} onToggle={() => setPasswordVisible(visible => !visible)} />
          </CredentialField>
          <a className="forgot-password text-link" href="/forgot-password" onClick={showNotice("Password recovery is not available yet.")}>
            Forgot your password?
          </a>
          <button className="auth-button" type="submit">
            <span>Sign in</span>
          </button>
        </form>
        <p className="signup-prompt">
          New to Coup? <a className="signup-link text-link" href="/register" onClick={linkTo("/register")}>Sign up</a>
        </p>
        <p className="feature-notice" role="status" aria-live="polite">{notice}</p>
      </section>
    </DesktopScene>
  );
}
