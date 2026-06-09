'use client'

import type { Task } from '../types'
import TaskItem from './TaskItem'

interface Props {
  tasks: Task[]
  showMoveToToday?: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onMoveToToday?: (id: string) => void
  emptyMessage?: string
}

export default function TaskList({
  tasks,
  showMoveToToday,
  onToggle,
  onDelete,
  onMoveToToday,
  emptyMessage = 'Keine Aufgaben',
}: Props) {
  if (tasks.length === 0) {
    return <p className="text-sm text-stone-400">{emptyMessage}</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          showMoveToToday={showMoveToToday}
          onToggle={onToggle}
          onDelete={onDelete}
          onMoveToToday={onMoveToToday}
        />
      ))}
    </ul>
  )
}
