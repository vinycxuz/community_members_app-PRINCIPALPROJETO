import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'

const queryClient = new QueryClient()

const stripePromise = loadStripe('pk_test_51POlOhP3DcYpB1nj9nJkX85gGbr13JTd7M5iN88tnPImHgvdE6FprctUlDVxp9dJmPDzJB43MM4DC9nUskQsbxDJ00oqZs37YY')

const options = {
  mode:'payment',
  currency:'brl',
  amount: 1000,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise} options={options}> 
          <App />
        </Elements>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
