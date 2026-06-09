'use client'

import { useState } from 'react'
import type { Task } from '../types'

interface Props {
  task: Task
  showMoveToToday?: boolean
  onToggle: (id: string) => void
  onEdit: (id: string, text: string, time?: string) => void
  onDelete: (id: string) => void
  onMoveToToday?: (id: string) => void
}

function isOverdue(time: string): boolean {
  const now = new Date()
  const [h, m] = time.split(':').map(Number)
  return now.getHours() * 60 + now.getMinutes() > h * 60 + m
}

export default function TaskItem({
  task,
  showMoveToToday,
  onToggle,
  onEdit,
  onDelete,
  onMoveToToday,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editTime, setEditTime] = useState(task.time ?? '')

  const overdue = !task.done && !!task.time && isOverdue(task.time)

  function startEdit() {
    setEditText(task.text)
    setEditTime(task.time ?? '')
    setEditing(true)
  }

  function save() {
    const trimmed = editText.trim()
    if (!trimmed) return
    onEdit(task.id, trimmed, editTime || undefined)
    setEditing(false)
  }

  function cancel() {
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') save()
    if (e.key === 'Escape') cancel()
  }

  if (editing) {
    return (
      <li className="rounded-xl border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-900">
        <div className="space-y-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-stone-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-stone-400 dark:text-stone-600">Uhrzeit</label>
            <input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-xs text-stone-700 outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:focus:border-stone-500"
            />
            {editTime && (
              <button
                type="button"
                onClick={() => setEditTime('')}
                className="text-xs text-stone-400 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-400"
              >
                Entfernen
              </button>
            )}
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={save}
              disabled={!editText.trim()}
              className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white transition-colors disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
            >
              Speichern
            </button>
            <button
              onClick={cancel}
              className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-500 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:text-stone-500 dark:hover:bg-stone-800"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
      overdue
        ? 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30'
        : 'border-stone-100 bg-white dark:border-stone-800 dark:bg-stone-900'
    }`}>
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? 'Als offen markieren' : 'Als erledigt markieren'}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.done
            ? 'border-stone-900 bg-stone-900 dark:border-stone-400 dark:bg-stone-400'
            : 'border-stone-300 bg-white dark:border-stone-600 dark:bg-stone-900'
        }`}
      >
        {task.done && (
          <svg className="h-3 w-3 text-white dark:text-stone-900" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <span className={`truncate text-sm ${
          task.done
            ? 'text-stone-400 line-through dark:text-stone-600'
            : 'text-stone-800 dark:text-stone-200'
        }`}>
          {task.text}
        </span>
        {task.time && (
          <span className={`text-xs font-medium ${
            task.done
              ? 'text-stone-300 dark:text-stone-700'
              : overdue
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-stone-400 dark:text-stone-500'
          }`}>
            {task.time} Uhr{overdue ? ' · überfällig' : ''}
          </span>
        )}
      </div>

      {showMoveToToday && !task.done && onMoveToToday && (
        <button
          onClick={() => onMoveToToday(task.id)}
          aria-label="Nach Heute verschieben"
          className="shrink-0 rounded-lg px-2 py-1 text-xs text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-300"
        >
          → Heute
        </button>
      )}

      <button
        onClick={startEdit}
        aria-label="Aufgabe bearbeiten"
        className="shrink-0 text-stone-300 transition-colors hover:text-stone-600 dark:text-stone-700 dark:hover:text-stone-400"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 2.5a1.5 1.5 0 012.121 2.121l-7.5 7.5-2.829.707.707-2.828 7.5-7.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={() => onDelete(task.id)}
        aria-label="Aufgabe löschen"
        className="shrink-0 text-stone-300 transition-colors hover:text-red-400 dark:text-stone-700 dark:hover:text-red-500"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </li>
  )
}
