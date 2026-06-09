'use client'

import { useState } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Neue Aufgabe …"
        className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-stone-400"
      />
      <button
        type="submit"
        className="rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white active:bg-stone-700"
      >
        Hinzufügen
      </button>
    </form>
  )
}
