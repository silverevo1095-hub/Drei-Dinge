'use client'

import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { useTemplates } from './hooks/useTemplates'
import { useTheme } from './hooks/useTheme'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import TemplateList from './components/TemplateList'
import ThemeToggle from './components/ThemeToggle'

export default function Home() {
  const { todayTasks, laterTasks, todayFull, addTask, editTask, toggleTask, deleteTask, moveToToday } = useTasks()
  const { templates, addTemplate, deleteTemplate } = useTemplates()
  const { theme, toggle } = useTheme()
  const [showTemplates, setShowTemplates] = useState(false)

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto w-full max-w-sm space-y-6">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              Drei Dinge
            </h1>
            <p className="text-xs text-stone-400 dark:text-stone-600">Dein Fokus für heute</p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </header>

        {/* Task input */}
        <TaskInput onAdd={addTask} />

        {/* Heute */}
        <section className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-600">
              Heute
            </h2>
            {todayFull && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                Limit erreicht
              </span>
            )}
          </div>
          <TaskList
            tasks={todayTasks}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
            emptyMessage="Noch nichts für heute — verschiebe Aufgaben aus Später."
          />
        </section>

        {/* Später */}
        <section className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-600">
            Später
          </h2>
          <TaskList
            tasks={laterTasks}
            showMoveToToday={!todayFull}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
            onMoveToToday={moveToToday}
            emptyMessage="Keine weiteren Aufgaben."
          />
        </section>

        {/* Standardaufgaben */}
        <section className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <button
            onClick={() => setShowTemplates((v) => !v)}
            className="flex w-full items-center justify-between"
          >
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-600">
              Standardaufgaben
            </h2>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className={`h-3.5 w-3.5 text-stone-400 transition-transform dark:text-stone-600 ${showTemplates ? 'rotate-180' : ''}`}
            >
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showTemplates && (
            <div className="mt-3">
              <TemplateList
                templates={templates}
                onUse={(text) => addTask(text)}
                onDelete={deleteTemplate}
                onAdd={addTemplate}
              />
            </div>
          )}
        </section>

      </div>
    </main>
  )
}
