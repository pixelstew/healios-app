import {useRef, useState} from 'react'
import {format} from 'date-fns'
import {usePatientNote} from '../../hooks/data'
import styles from '../../styles/PatientNote.module.css'

import type {User, Note} from '../../types'

interface PatientNoteProps extends Note {
  user: User
  patientId: string
}

export function PatientNote({
  user,
  patientId,
  id,
  author,
  title,
  content,
  system,
  history,
}: PatientNoteProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  const lastEdit = history.length ? history[history.length - 1] : undefined
  const {deleteNote, updateNote} = usePatientNote(id, patientId)

  const handleDelete = () => {
    deleteNote()
  }

  const handleUpdate = () => {
    if (!ref.current) return
    updateNote({author: user, content: ref.current.value})
    setIsEdit(false)
  }

  return (
    <li className={styles.note}>
      <div>
        <h2>{title}</h2>
        {!isEdit ? (
          <>
            <p>{content}</p>
            {!system && (
              <div className={styles.noteActions}>
                <button
                  className={styles.buttonNeutral}
                  role="button"
                  name="edit"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  Edit
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <textarea
                className={styles.textarea}
                ref={ref}
                defaultValue={content}
                cols={30}
                rows={20}
              />
            </div>
            <div className={styles.noteActions}>
              <button
                className={styles.buttonNegative}
                name="cancel"
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </button>
              <button
                className={styles.buttonPositive}
                name="submit"
                onClick={handleUpdate}
              >
                Submit changes
              </button>
            </div>
          </>
        )}
        <p>
          <b>Note created by: {author.name}</b>
        </p>
        {lastEdit && (
          <>
            <p>{`Last edited: ${format(new Date(lastEdit.time), 'Pp')}
            - by ${lastEdit.author.name}`}</p>
          </>
        )}
      </div>
      <div className={styles.noteFooter}>
        {!system ? (
          <>
            <p className={styles.badgeUser}>User generated note</p>
            {user.id === author.id && (
              <button
                className={styles.buttonNegative}
                type="button"
                name="delete"
                onClick={handleDelete}
              >
                Delete Note
              </button>
            )}
          </>
        ) : (
          <p className={styles.badgeSystem}>System generated note</p>
        )}
      </div>
    </li>
  )
}
