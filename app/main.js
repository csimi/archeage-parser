import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout';

function App () {
	return (
		<Layout />
	);
}

const root = createRoot(document.getElementById('react-app'));
root.render(<App />);
