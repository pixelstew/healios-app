import useSWR from 'swr'
import {api} from '../../mocks/'

export function usePatientNotes(patientId: string) {
  const getFn = () => api.getPatientNotes(patientId)

  const {data, isValidating, error} = useSWR(
    `/patient/${patientId}/notes`,
    getFn,
    {
      revalidateOnFocus: false,
    },
  )

  return {data, isLoading: isValidating, error}
}
