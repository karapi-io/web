import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { store } from './store';
import AuthListener from './components/AuthListener';

const helmetContext = {};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <AuthListener />
        <App />
        <Analytics />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
)
