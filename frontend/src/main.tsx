import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {HelmetProvider} from 'react-helmet-async';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StoreProvider } from './Store.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
<StrictMode>
  <StoreProvider>
  <PayPalScriptProvider options={{clientId: 'sb'}} deferLoading={true}>
    <HelmetProvider>
    <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </HelmetProvider>
  </PayPalScriptProvider>
  </StoreProvider>
</StrictMode>,
)



