import { createRoot }from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root") );

root.render(
  <Auth0Provider
      domain="dev-zdg58n1ngib8m466.us.auth0.com"
      clientId="AeJ3HBYUIFGk2smDOK7wfYoSIndEZ0sT"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <App />
    </Auth0Provider>,
  );
