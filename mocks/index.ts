import {notes as mockNotes} from './data'

import type {Note, UpdatePayload} from '../types'

class HealiosApi {
  notes
  failureRate = 0

  constructor(mockNotes: Note[]) {
    this.notes = mockNotes
  }

  private getDelay() {
    return Math.floor(Math.random() * 2000)
  }

  private getFailureRate() {
    return Math.random() < this.failureRate
  }

  public getPatientNotes = (patientId: string) => {
    console.log('Pass in patientId', patientId)
    const delay = this.getDelay()
    const error = this.getFailureRate()

    return new Promise<Note[]>((resolve, reject) => {
      setTimeout(
        () =>
          error
            ? reject(
                new Error(
                  'HealiosAPI::getPatientNotes - there was an error fetching Patient notes from the API.',
                ),
              )
            : resolve(this.notes),
        delay,
      )
    })
  }

  public deletePatientNote = (noteId: string) => {
    const delay = this.getDelay()
    const error = this.getFailureRate()

    this.notes = this.notes.filter(note => note.id !== noteId)

    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          error
            ? reject(
                new Error(
                  'HealiosAPI::deletePatientNote - there was an error deleting the note.',
                ),
              )
            : resolve(this.notes),
        delay,
      )
    })
  }

  public updatePatientNote(noteId: string, payload: UpdatePayload) {
    const delay = this.getDelay()
    const error = this.getFailureRate()

    this.notes = this.notes.map(note => {
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

    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          error
            ? reject(
                new Error(
                  'HealiosAPI::updatePatientNote - there was an error updating the note.',
                ),
              )
            : resolve(this.notes),
        delay,
      )
    })
  }
}

export const api = new HealiosApi(mockNotes)
