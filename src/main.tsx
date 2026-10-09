import React from 'react'
import { ViteReactSSG } from 'vite-react-ssg'
import { HelmetProvider } from 'react-helmet-async'
import routes from './routes'
import './index.css'

export const createRoot = ViteReactSSG(
  { routes, base: '' },
  ({ app }) => {
    return (
      <React.StrictMode>
        <HelmetProvider>
          {app}
        </HelmetProvider>
      </React.StrictMode>
    )
  }
)