export interface Note {
  id: string
  author: User
  title: string
  content: string
  system: boolean
  history: Array<{author: User; time: string}>
}

export interface User {
  id: string
  name: string
}

export interface Patient {
  id: string
  name: string
  notes: Note[]
}

export interface UpdatePayload {
  author: User
  content: string
}
