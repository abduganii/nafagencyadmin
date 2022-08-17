import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as AuthProvider } from './Context/Authentication';
import { BrowserRouter } from 'react-router-dom';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
	timeout: 5000,
	position: positions.BOTTOM_CENTER,
};


ReactDOM.render(
	<React.StrictMode>
		<Provider template={AlertTemplate} {...options}>
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

