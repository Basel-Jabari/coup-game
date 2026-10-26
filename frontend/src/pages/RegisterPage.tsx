import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { CardArtwork } from "../components/CardArtwork";
import { CoinBackground } from "../components/CoinBackground";
import { CredentialField } from "../components/CredentialField";
import { DesktopScene } from "../components/DesktopScene";
import { PasswordHelp } from "../components/PasswordHelp";
import { PasswordToggle } from "../components/PasswordToggle";
import { linkTo } from "../navigation";
import { checkName, nameMessage } from "../security/namePolicy";
import { checkPassword, levelLabel, passwordMessage, passwordPolicy } from "../security/passwordPolicy";
import type { PasswordLevel, StrengthEngine } from "../security/passwordPolicy";
import { loadStrengthEngine } from "../security/strengthEngine";
import { emailWarning } from "../validation";

type Field = "name" | "email" | "password" | "confirm";
type Warnings = Partial<Record<Field, string>>;
type Values = Record<Field, string>;

const BAR_COUNT = 4;
const levelBars: Record<PasswordLevel, number> = { weak: 1, fair: 2, good: 3, strong: 4 };

// Local checks only. Accounts will be created by the backend, which repeats every check.
function findWarnings(values: Values, engine: StrengthEngine): Warnings {
  const name = checkName(values.name);
  const password = checkPassword(values.password, { username: values.name, email: values.email }, engine);
  return {
    name: name.reason ? nameMessage(name.reason) : undefined,
    email: emailWarning(values.email),
    password: !values.password ? "Enter a password." : password.reason ? passwordMessage(password.reason) : undefined,
    confirm: !values.confirm ? "Confirm your password." : values.confirm !== values.password ? "Passwords don't match." : undefined,
  };
}

export function RegisterPage() {
  const [values, setValues] = useState<Values>({ name: "", email: "", password: "", confirm: "" });
  const [warnings, setWarnings] = useState<Warnings>({});
  const [visible, setVisible] = useState({ password: false, confirm: false });
  const [engine, setEngine] = useState<StrengthEngine>();
  const latest = useRef(values);

  useEffect(() => {
    latest.current = values;
  }, [values]);

  useEffect(() => {
    document.title = "Create account · Coup";
    let active = true;
    loadStrengthEngine().then(loaded => { if (active) setEngine(() => loaded); });
    return () => { active = false; };
  }, []);

  function change(field: Field, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setWarnings(current => ({ ...current, [field]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitted = values;
    const loaded = await loadStrengthEngine();
    // If a field changed while the checker loaded, these results are old; the next submit checks again.
    if (latest.current !== submitted) return;
    setWarnings(findWarnings(submitted, loaded));
  }

  const level = values.password && engine
    ? checkPassword(values.password, { username: values.name, email: values.email }, engine).level
    : undefined;
  const showHint = !warnings.password && [...values.password.normalize("NFC")].length < passwordPolicy.minLength;
  // The password warning uses the hint's row, so only these three warnings add space to the panel.
  const panelClass = ["auth-panel register-panel", warnings.name && "has-name-warning", warnings.email && "has-email-warning", warnings.confirm && "has-confirm-warning"]
    .filter(Boolean)
    .join(" ");

  return (
    <DesktopScene label="Coup create account" sceneClass="register-scene">
      <CoinBackground />
      <CardArtwork />
      <section className={panelClass} aria-labelledby="register-heading">
        <img className="coup-emblem select-none" src="/assets/coup-emblem.svg" alt="" draggable="false" />
        <h1 id="register-heading">Create Account</h1>
        <form onSubmit={submit} noValidate aria-label="Create account">
          <CredentialField
            id="register-name" name="name" autoComplete="nickname" autoCapitalize="none" spellCheck={false}
            placeholder="Name. Visible to other players." label="Name" icon="user" warning={warnings.name}
            value={values.name} onChange={event => change("name", event.target.value)}
          />
          <CredentialField
            id="register-email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false}
            placeholder="Email Address" label="Email address" icon="mail" warning={warnings.email}
            value={values.email} onChange={event => change("email", event.target.value)}
          />
          <div className={"password-strength" + (level ? " level-" + level : "")}>
            <CredentialField
              id="register-password" name="password" type={visible.password ? "text" : "password"} autoComplete="new-password"
              placeholder="Password" label="Password" icon="lock" warning={warnings.password}
              describedBy={"password-level" + (showHint ? " password-hint" : "")}
              value={values.password} onChange={event => change("password", event.target.value)}
            >
              <PasswordToggle visible={visible.password} onToggle={() => setVisible(current => ({ ...current, password: !current.password }))} />
            </CredentialField>
            <PasswordHelp minLength={passwordPolicy.minLength} />
            <div className="password-meter" aria-hidden="true">
              {Array.from({ length: BAR_COUNT }, (_, index) => (
                <span key={index} className={"meter-bar" + (level && index < levelBars[level] ? " on" : "")} />
              ))}
            </div>
            <p className="password-level" id="password-level" aria-live="polite">
              <span className="sr-only">Password strength: </span>{level ? levelLabel(level) : "-"}
            </p>
            {showHint && <p className="password-hint" id="password-hint">At least {passwordPolicy.minLength} characters</p>}
          </div>
          <CredentialField
            id="register-confirm" name="confirm" type={visible.confirm ? "text" : "password"} autoComplete="new-password"
            placeholder="Confirm password" label="Confirm password" icon="lock" warning={warnings.confirm}
            value={values.confirm} onChange={event => change("confirm", event.target.value)}
          >
            <PasswordToggle visible={visible.confirm} subject="confirm password" onToggle={() => setVisible(current => ({ ...current, confirm: !current.confirm }))} />
          </CredentialField>
          <button className="auth-button" type="submit">
            <span>Sign up</span>
          </button>
        </form>
        <p className="signin-prompt">
          Already have an account? <a className="signin-link text-link" href="/" onClick={linkTo("/")}>Sign in</a>
        </p>
      </section>
    </DesktopScene>
  );
}
