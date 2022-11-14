import '@testing-library/jest-dom'
import {
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import {customRender} from '../helpers/customRender'
import {api as mockApi} from '../mocks'
import Home from '../pages/index'
import PatientNotes from '../components/PatientNotes'
import {patient, currentUser, notes} from '../mocks/data'

jest.mock('../mocks')

expect.extend(toHaveNoViolations)

describe('Appliciation', () => {
  beforeEach(async () => {
    customRender(<Home />)
  })
  it('the app to be free from accesibility violations', async () => {
    const results = await axe(document.body)
    expect(results).toHaveNoViolations()
  })
})

describe('Patient Notes', () => {
  beforeEach(async () => {
    mockApi.getPatientNotes.mockResolvedValueOnce(notes)
    mockApi.updatePatientNote.mockResolvedValueOnce(notes)
    customRender(<PatientNotes patient={patient} currentUser={currentUser} />)
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
  })

  it('allows delete for a user note authored by currentUser', () => {
    const deletableNote = screen.getAllByText(/delete/i)[0].closest('li')
    expect(
      within(deletableNote).getByText(currentUser.name, {exact: false}),
    ).toBeInTheDocument()
    expect(
      within(deletableNote).getByText(/User generated note/i),
    ).toBeInTheDocument()
  })

  it('deletes a patient note', () => {
    const deletableNote = screen.getAllByText(/delete/i)[0].closest('li')
    within(deletableNote).getByText(currentUser.name, {exact: false})
    fireEvent.click(within(deletableNote).getByText(/delete/i))
    expect(deletableNote).not.toBeInTheDocument()
  })

  it('does not allow delete for any note not authored by current user', () => {
    const nonDeletableNote = screen.getAllByText(/edit/i)[1].closest('li')
    expect(
      within(nonDeletableNote).queryByText(/delete/i),
    ).not.toBeInTheDocument()
  })

  it('does not allow delete for system notes authored by current user', () => {
    const nonDeletableNote = screen
      .getAllByText(currentUser.name, {
        exact: false,
      })[1]
      .closest('li')
    expect(
      within(nonDeletableNote).queryByText(/delete/i),
    ).not.toBeInTheDocument()
  })

  it('updates a user generated patient note', () => {
    const editableNote = screen
      .getAllByText(/User generated note/i)[0]
      .closest('li')
    fireEvent.click(within(editableNote).getByText(/^edit$/i))
    fireEvent.change(within(editableNote).getByRole('textbox'), {
      target: {value: 'Updated note'},
    })
    fireEvent.click(within(editableNote).getByText(/Submit changes/))
    expect(within(editableNote).getByText(`Updated note`)).toBeInTheDocument()
  })

  it('does not update a system generated patient note', () => {
    const editableNote = screen
      .getAllByText(/System generated note/i)[0]
      .closest('li')
    expect(within(editableNote).queryByText(/^edit$/i)).not.toBeInTheDocument()
  })
})
