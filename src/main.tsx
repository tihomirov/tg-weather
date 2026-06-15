import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { queryClient } from './shared/api/queryClient.ts';
import { App } from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('root is missing');
}

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
