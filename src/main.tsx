import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';


// 1. Create the context object outside the render
const helmetContext = {};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Pass it to the provider */}
    <HelmetProvider context={helmetContext}>
      <App />
      <Analytics />
    </HelmetProvider>
  </StrictMode>,
)