import { Icon } from "./Icon";

type PasswordToggleProps = {
  visible: boolean;
  onToggle: () => void;
  /** Names the field in the button label, for example "password" or "confirm password". */
  subject?: string;
};

export function PasswordToggle({ visible, onToggle, subject = "password" }: PasswordToggleProps) {
  return (
    <button
      className="password-toggle" type="button"
      aria-label={(visible ? "Hide " : "Show ") + subject} aria-pressed={visible}
      onClick={onToggle}
    >
      <Icon name={visible ? "eye-off" : "eye"} />
    </button>
  );
}
