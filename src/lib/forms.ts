import { useCallback, useRef, useState, type FormEvent } from 'react'

export type Rule<T> = (value: string, values: T) => string | null

export const rules = {
  required:
    (message = 'Ce champ est obligatoire.') =>
    (value: string) =>
      value.trim() ? null : message,
  email:
    (message = 'Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.') =>
    (value: string) =>
      !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? null : message,
  postalCode:
    (message = 'Le code postal doit comporter 5 chiffres.') =>
    (value: string) =>
      !value.trim() || /^\d{5}$/.test(value.trim()) ? null : message,
  phone:
    (message = 'Saisissez un numéro à 10 chiffres, par exemple 06 12 34 56 78.') =>
    (value: string) =>
      !value.trim() || /^0\d(\s?\d{2}){4}$/.test(value.trim()) ? null : message,
  minLength:
    (min: number, message = `Saisissez au moins ${min} caractères.`) =>
    (value: string) =>
      !value.trim() || value.trim().length >= min ? null : message,
}

type Values = Record<string, string>

/**
 * Formulaire contrôlé avec validation au blur puis à la soumission.
 * À la soumission invalide, le focus va sur le résumé d'erreurs (role="alert").
 */
export function useForm<T extends Values>(initial: T, schema: Partial<Record<keyof T, Rule<T>[]>>) {
  const [values, setValues] = useState<T>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const summaryRef = useRef<HTMLDivElement>(null)

  const validateField = useCallback(
    (name: keyof T, all: T) => {
      for (const rule of schema[name] ?? []) {
        const message = rule(all[name] ?? '', all)
        if (message) return message
      }
      return null
    },
    [schema],
  )

  const field = (name: keyof T & string) => ({
    name,
    id: `champ-${name}`,
    value: values[name] ?? '',
    error: touched[name] ? errors[name] : undefined,
    onChange: (event: { target: { value: string } }) => {
      const next = { ...values, [name]: event.target.value }
      setValues(next)
      if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, next) ?? undefined }))
    },
    onBlur: () => {
      setTouched((prev) => ({ ...prev, [name]: true }))
      setErrors((prev) => ({ ...prev, [name]: validateField(name, values) ?? undefined }))
    },
  })

  const handleSubmit = (onValid: (values: T) => void) => (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Partial<Record<keyof T, string>> = {}
    for (const name of Object.keys(schema) as Array<keyof T>) {
      const message = validateField(name, values)
      if (message) nextErrors[name] = message
    }
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(schema).map((key) => [key, true])) as Partial<Record<keyof T, boolean>>)
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    onValid(values)
  }

  const errorList = (Object.entries(errors) as Array<[keyof T & string, string | undefined]>).filter(
    (entry): entry is [keyof T & string, string] => Boolean(entry[1]) && Boolean(touched[entry[0]]),
  )

  return { values, setValues, field, handleSubmit, errors: errorList, summaryRef }
}
