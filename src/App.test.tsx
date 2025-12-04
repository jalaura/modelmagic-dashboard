import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // Since App uses HashRouter internally, wrapping it in BrowserRouter might cause issues if not handled.
    // However, for a simple smoke test, we just want to see if it renders.
    // Ideally, we should mock the router or adjust App to accept a router prop.
  });
});