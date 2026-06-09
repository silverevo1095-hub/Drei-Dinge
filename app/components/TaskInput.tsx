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
          className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-stone-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white active:bg-stone-700"
        >
          Hinzufügen
        </button>
      </div>
      <div className="flex items-center gap-2 px-1">
        <label className="text-xs text-stone-400">Uhrzeit (optional)</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="rounded-lg border border-stone-200 bg-white px-2 py-1 text-xs text-stone-700 outline-none focus:border-stone-400"
        />
        {time && (
          <button
            type="button"
            onClick={() => setTime('')}
            className="text-xs text-stone-400 hover:text-stone-600"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  )
}
