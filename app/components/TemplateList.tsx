'use client'

import { useState } from 'react'
import type { Template } from '../types'

interface Props {
  templates: Template[]
  onUse: (text: string) => void
  onDelete: (id: string) => void
  onAdd: (text: string) => void
}

export default function TemplateList({ templates, onUse, onDelete, onAdd }: Props) {
  const [value, setValue] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Neue Vorlage …"
          className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder-stone-600 dark:focus:border-stone-500"
        />
        <button
          type="submit"
          className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-600 transition-colors active:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400 dark:active:bg-stone-800"
        >
          Speichern
        </button>
      </form>

      {templates.length === 0 ? (
        <p className="text-sm text-stone-400 dark:text-stone-600">Noch keine Vorlagen.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {templates.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
              <span className="flex-1 truncate text-sm text-stone-700 dark:text-stone-300">{t.text}</span>
              <button
                onClick={() => onUse(t.text)}
                className="shrink-0 rounded-lg px-2 py-1 text-xs text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-300"
                aria-label="Als Aufgabe hinzufügen"
              >
                + Aufgabe
              </button>
              <button
                onClick={() => onDelete(t.id)}
                aria-label="Vorlage löschen"
                className="shrink-0 text-stone-300 transition-colors hover:text-red-400 dark:text-stone-700 dark:hover:text-red-500"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
