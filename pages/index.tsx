import PatientNotes from '../components/PatientNotes'
import {patient, currentUser} from '../mocks/data'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <PatientNotes patient={patient} currentUser={currentUser} />
    </Layout>
  )
}
