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
          className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-stone-400"
        />
        <button
          type="submit"
          className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-600 active:bg-stone-50"
        >
          Speichern
        </button>
      </form>

      {templates.length === 0 ? (
        <p className="text-sm text-stone-400">Noch keine Vorlagen.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {templates.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white px-4 py-3">
              <span className="flex-1 truncate text-sm text-stone-700">{t.text}</span>
              <button
                onClick={() => onUse(t.text)}
                className="shrink-0 text-xs text-stone-400 hover:text-stone-700"
                aria-label="Als Aufgabe hinzufügen"
              >
                + Aufgabe
              </button>
              <button
                onClick={() => onDelete(t.id)}
                aria-label="Vorlage löschen"
                className="shrink-0 text-stone-300 hover:text-red-400"
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
