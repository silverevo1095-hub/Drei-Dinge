export interface Task {
  id: string
  text: string
  done: boolean
  bucket: 'today' | 'later'
}
