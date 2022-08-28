import React from 'react';
import { createRoot } from 'react-dom/client';
import TestComponent from './components/test-component.jsx';

const root = createRoot(document.getElementById('react'));
root.render(<TestComponent />);