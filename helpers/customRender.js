import {SWRConfig} from 'swr'
import {render} from '@testing-library/react'

const AllTheProviders = ({children}) => {
  return (
    <SWRConfig value={{dedupingInterval: 0, provider: () => new Map()}}>
      {children}
    </SWRConfig>
  )
}

export const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})
