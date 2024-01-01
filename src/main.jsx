// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ResponseProvider } from './context/ResponseProvider.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

(async () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Router>
      <ResponseProvider>
        <Elements stripe={stripePromise}>
          <Theme appearance="dark" accentColor="iris">
            {' '}
            <App />
          </Theme>
        </Elements>
      </ResponseProvider>
    </Router>,
    // </React.StrictMode>,
  );
})();
