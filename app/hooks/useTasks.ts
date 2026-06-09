'use client'

import { useState } from 'react'
import type { Task } from '../types'

const STORAGE_KEY = 'drei-dinge-tasks'
const TODAY_OPEN_LIMIT = 3

function load(): Task[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function sortByTime(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.time && b.time) return a.time.localeCompare(b.time)
    if (a.time) return -1
    if (b.time) return 1
    return 0
  })
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(load)

  function update(next: Task[]) {
    setTasks(next)
    save(next)
  }

  function addTask(text: string, time?: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      text,
      done: false,
      bucket: 'later',
      ...(time ? { time } : {}),
    }
    update([...tasks, task])
  }

  function toggleTask(id: string) {
    update(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTask(id: string) {
    update(tasks.filter((t) => t.id !== id))
  }

  function editTask(id: string, text: string, time?: string) {
    update(tasks.map((t) => (t.id === id ? { ...t, text, time: time ?? undefined } : t)))
  }

  function moveToToday(id: string) {
    const openToday = tasks.filter((t) => t.bucket === 'today' && !t.done).length
    if (openToday >= TODAY_OPEN_LIMIT) return
    update(tasks.map((t) => (t.id === id ? { ...t, bucket: 'today' } : t)))
  }

  const todayTasks = sortByTime(tasks.filter((t) => t.bucket === 'today'))
  const laterTasks = sortByTime(tasks.filter((t) => t.bucket === 'later'))
  const openTodayCount = todayTasks.filter((t) => !t.done).length
  const todayFull = openTodayCount >= TODAY_OPEN_LIMIT

  return { todayTasks, laterTasks, todayFull, addTask, editTask, toggleTask, deleteTask, moveToToday }
}
