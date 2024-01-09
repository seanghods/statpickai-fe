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
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.Feedback({
      buttonLabel: '',
      colorScheme: 'dark',
      themeDark: {
        background: '#1F2937',
      },
    }),
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/statpickai\.com\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
