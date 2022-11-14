import {usePatientNotes} from '../../hooks/data'
import PatientNote from '../../components/PatientNote'
import styles from '../../styles/PatientNotes.module.css'

import type {Note, Patient, User} from '../../types'

interface PatientNotesProps {
  patient: Patient
  currentUser: User
}

export function PatientNotes({patient, currentUser}: PatientNotesProps) {
  const {data, isLoading, error} = usePatientNotes(patient.id)
  const notes = data as Array<Note>

  return (
    <>
      <h1>{patient.name} - notes</h1>
      {error && <p>{error}</p>}
      {!data && isLoading ? (
        <div className={styles.loading}>loading...</div>
      ) : (
        <ul className={styles.grid}>
          {notes &&
            notes.map(note => {
              return (
                <PatientNote
                  {...note}
                  user={currentUser}
                  key={note.id}
                  patientId={patient.id}
                />
              )
            })}
        </ul>
      )}
    </>
  )
}
