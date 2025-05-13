import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { NotFoundPage } from '@/pages/NotFoundPage';
//import { makeServer } from '@/lib/mock-server';

// Initialize mock server in development
/* if (import.meta.env.DEV) {
  makeServer({ environment: 'development' });
} */
import { Providers } from './providers';

// Pass the NotFoundPage component to the router configuration
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  scrollRestoration: true,

});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
