import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

type CredentialFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  label: string;
  icon: IconName;
  warning?: string;
  /** An extra control after the input, such as the password eye. */
  children?: ReactNode;
};

export function CredentialField({ label, icon, warning, children, ...input }: CredentialFieldProps) {
  const warningId = input.name + "-warning";
  return (
    <div className={"credential-field " + input.name + "-field" + (warning ? " has-warning" : "")}>
      <label className="sr-only" htmlFor={input.id}>{label}</label>
      <Icon name={icon} className="field-icon" />
      <input {...input} aria-invalid={warning ? true : undefined} aria-describedby={warning ? warningId : undefined} />
      {children}
      {warning && <span className="field-warning" id={warningId} role="alert"><Icon name="warning" />{warning}</span>}
    </div>
  );
}
