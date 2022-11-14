import {useSWRConfig} from 'swr'
import {api} from '../../mocks/'

import type {Note, UpdatePayload} from '../../types'

export function usePatientNote(noteId: string, patientId: string) {
  const {cache, mutate} = useSWRConfig()

  const currentNotes = cache.get(`/patient/${patientId}/notes`) as Note[]

  const deleteNote = () => {
    const delteFn = () => api.deletePatientNote(noteId)
    const newNotes = currentNotes.filter(note => note.id !== noteId)
    const options = {optimisticData: newNotes, rollbackOnError: true}

    mutate(`/patient/${patientId}/notes`, delteFn(), options)
  }

  const updateNote = async (payload: UpdatePayload) => {
    const updateFn = () => api.updatePatientNote(noteId, payload)

    const newNotes = currentNotes.map(note => {
      if (note.id === noteId) {
        const newNote = note
        newNote.content = payload.content
        newNote.history.push({
          author: payload.author,
          time: new Date().toISOString(),
        })
        return {...newNote}
      }
      return note
    })
    const options = {optimisticData: newNotes, rollbackOnError: true}
    mutate(`/patient/${patientId}/notes`, updateFn(), options)
  }

  return {deleteNote, updateNote}
}
