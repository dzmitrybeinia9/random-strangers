import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Query from './components/Query.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Query />
    </QueryClientProvider>
  </StrictMode>,
)
