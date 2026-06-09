export interface Task {
  id: string
  text: string
  done: boolean
  bucket: 'today' | 'later'
  time?: string // "HH:MM", optional
}

export interface Template {
  id: string
  text: string
}
