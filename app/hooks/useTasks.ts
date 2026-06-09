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

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(load)

  function update(next: Task[]) {
    setTasks(next)
    save(next)
  }

  function addTask(text: string) {
    const task: Task = { id: crypto.randomUUID(), text, done: false, bucket: 'later' }
    update([...tasks, task])
  }

  function toggleTask(id: string) {
    update(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTask(id: string) {
    update(tasks.filter((t) => t.id !== id))
  }

  function moveToToday(id: string) {
    const openToday = tasks.filter((t) => t.bucket === 'today' && !t.done).length
    if (openToday >= TODAY_OPEN_LIMIT) return
    update(tasks.map((t) => (t.id === id ? { ...t, bucket: 'today' } : t)))
  }

  const todayTasks = tasks.filter((t) => t.bucket === 'today')
  const laterTasks = tasks.filter((t) => t.bucket === 'later')
  const openTodayCount = todayTasks.filter((t) => !t.done).length
  const todayFull = openTodayCount >= TODAY_OPEN_LIMIT

  return { todayTasks, laterTasks, todayFull, addTask, toggleTask, deleteTask, moveToToday }
}
