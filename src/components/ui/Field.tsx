import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const control =
  'mt-2 block w-full min-h-12 rounded-2xl border-2 bg-white/80 px-4 py-3 text-base text-ink placeholder:text-ink/45 transition-colors focus:border-forest focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 disabled:bg-cream-deep disabled:text-ink/60'

interface BaseProps {
  label: string
  id: string
  error?: string
  hint?: ReactNode
  required?: boolean
  className?: string
}

function Wrapper({ label, id, error, hint, required, className, children }: BaseProps & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-medium text-forest">
        {label}
        {required ? (
          <span className="text-terracotta-dark" aria-hidden="true">
            {' '}*
          </span>
        ) : (
          <span className="font-normal text-ink/70"> (facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-aide`} className="mt-1.5 text-sm text-ink/75">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-erreur`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, error?: string, hint?: ReactNode) {
  if (error) return `${id}-erreur`
  if (hint) return `${id}-aide`
  return undefined
}

type InputProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>

export function TextField({ label, id, error, hint, required, className, ...props }: InputProps) {
  return (
    <Wrapper label={label} id={id} error={error} hint={hint} required={required} className={className}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, error ? 'border-danger' : 'border-forest/20')}
        {...props}
      />
    </Wrapper>
  )
}

type TextareaProps = BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'>

export function TextareaField({ label, id, error, hint, required, className, ...props }: TextareaProps) {
  return (
    <Wrapper label={label} id={id} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={id}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, 'resize-y', error ? 'border-danger' : 'border-forest/20')}
        {...props}
      />
    </Wrapper>
  )
}

type SelectProps = BaseProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className'> & { children: ReactNode }

export function SelectField({ label, id, error, hint, required, className, children, ...props }: SelectProps) {
  return (
    <Wrapper label={label} id={id} error={error} hint={hint} required={required} className={className}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, error ? 'border-danger' : 'border-forest/20')}
        {...props}
      >
        {children}
      </select>
    </Wrapper>
  )
}

/** Résumé d'erreurs focalisé à la soumission, avec liens vers les champs. */
export function ErrorSummary({
  errors,
  labels,
  summaryRef,
}: {
  errors: Array<[string, string]>
  labels: Record<string, string>
  summaryRef: React.RefObject<HTMLDivElement | null>
}) {
  if (errors.length === 0) return null
  return (
    <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-2xl border-2 border-danger bg-white p-5 outline-none">
      <p className="font-semibold text-danger">
        {errors.length === 1 ? 'Un champ est à corriger :' : `${errors.length} champs sont à corriger :`}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {errors.map(([name, message]) => (
          <li key={name}>
            <a href={`#champ-${name}`} className="text-danger underline underline-offset-2">
              {labels[name] ?? name} : {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
