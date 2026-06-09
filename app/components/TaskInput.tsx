'use client'

import { useState } from 'react'

interface Props {
  onAdd: (text: string, time?: string) => void
  defaultText?: string
}

export default function TaskInput({ onAdd, defaultText = '' }: Props) {
  const [text, setText] = useState(defaultText)
  const [time, setTime] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, time || undefined)
    setText('')
    setTime('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Neue Aufgabe …"
          className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder-stone-600 dark:focus:border-stone-500"
        />
        <button
          type="submit"
          className="rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:active:bg-stone-300"
        >
          Hinzufügen
        </button>
      </div>
      <div className="flex items-center gap-3 px-1">
        <label className="text-xs text-stone-400 dark:text-stone-500">Uhrzeit (optional)</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="rounded-lg border border-stone-200 bg-white px-2 py-1 text-xs text-stone-700 outline-none transition-colors focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:focus:border-stone-500"
        />
        {time && (
          <button
            type="button"
            onClick={() => setTime('')}
            className="text-xs text-stone-400 transition-colors hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-400"
          >
            Zurücksetzen
          </button>
        )}
      </div>
    </form>
  )
}
