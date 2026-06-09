'use client'

import type { Task } from '../types'

interface Props {
  task: Task
  showMoveToToday?: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onMoveToToday?: (id: string) => void
}

export default function TaskItem({
  task,
  showMoveToToday,
  onToggle,
  onDelete,
  onMoveToToday,
}: Props) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white px-4 py-3">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? 'Als offen markieren' : 'Als erledigt markieren'}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.done
            ? 'border-stone-900 bg-stone-900'
            : 'border-stone-300 bg-white'
        }`}
      >
        {task.done && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-sm ${task.done ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
        {task.text}
      </span>

      {showMoveToToday && !task.done && onMoveToToday && (
        <button
          onClick={() => onMoveToToday(task.id)}
          aria-label="Nach Heute verschieben"
          className="text-xs text-stone-400 hover:text-stone-700"
        >
          → Heute
        </button>
      )}

      <button
        onClick={() => onDelete(task.id)}
        aria-label="Aufgabe löschen"
        className="text-stone-300 hover:text-red-400"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </li>
  )
}
