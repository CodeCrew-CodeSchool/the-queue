import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
    // Auth0 configuration options
    domain: "dev-w6rf4rv4jbk5r3xa.us.auth0.com",
    client_id: "gtDMnFu0PGyADPrv7NF0qktguF0ion2a",
    authorizationParams: {
        redirect_uri: window.location.origin
      }
  });

const QueueAPIClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 3000,
})

QueueAPIClient.interceptors.request.use(async (config) => {
    try {
        // Get the access token using getAccessTokenSilently
        const accessToken = await auth0.getTokenSilently();
    
        // Add the access token to the request headers
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
      } catch (error) {
        // Handle error if unable to get the access token
        console.error('Failed to get access token:', error);
        throw error;
      }
})


export default QueueAPIClient