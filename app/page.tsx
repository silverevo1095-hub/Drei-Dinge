'use client'

import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { useTemplates } from './hooks/useTemplates'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import TemplateList from './components/TemplateList'

export default function Home() {
  const { todayTasks, laterTasks, todayFull, addTask, toggleTask, deleteTask, moveToToday } = useTasks()
  const { templates, addTemplate, deleteTemplate } = useTemplates()
  const [showTemplates, setShowTemplates] = useState(false)

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto w-full max-w-sm space-y-8">

        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Drei Dinge</h1>
          <p className="mt-1 text-sm text-stone-500">Dein Fokus für heute</p>
        </header>

        <TaskInput onAdd={addTask} />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400">Heute</h2>
            {todayFull && (
              <span className="text-xs text-amber-500">Limit erreicht</span>
            )}
          </div>
          <TaskList
            tasks={todayTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            emptyMessage="Noch nichts für heute — verschiebe Aufgaben aus Später."
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400">Später</h2>
          <TaskList
            tasks={laterTasks}
            showMoveToToday={!todayFull}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onMoveToToday={moveToToday}
            emptyMessage="Keine weiteren Aufgaben."
          />
        </section>

        <section className="space-y-3">
          <button
            onClick={() => setShowTemplates((v) => !v)}
            className="flex w-full items-center justify-between"
          >
            <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Standardaufgaben
            </h2>
            <span className="text-xs text-stone-400">{showTemplates ? '▲' : '▼'}</span>
          </button>

          {showTemplates && (
            <TemplateList
              templates={templates}
              onUse={(text) => addTask(text)}
              onDelete={deleteTemplate}
              onAdd={addTemplate}
            />
          )}
        </section>

      </div>
    </main>
  )
}
