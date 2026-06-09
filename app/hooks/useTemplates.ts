'use client'

import { useState } from 'react'
import type { Template } from '../types'

const STORAGE_KEY = 'drei-dinge-templates'

function load(): Template[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(templates: Template[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>(load)

  function update(next: Template[]) {
    setTemplates(next)
    save(next)
  }

  function addTemplate(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    update([...templates, { id: crypto.randomUUID(), text: trimmed }])
  }

  function deleteTemplate(id: string) {
    update(templates.filter((t) => t.id !== id))
  }

  return { templates, addTemplate, deleteTemplate }
}
