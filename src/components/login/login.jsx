import { useState, useRef } from 'react';
import './Login.scss';
import useToken from '../../Hooks/useToken';

function Login() {
	const [, setToken] = useToken();
	const [status, setStatus] = useState(0);
	const login = useRef();
	const password = useRef();

	const loginSubmit = (e) => {
		e.preventDefault();
		(async () => {
			try {
				const res = await fetch(process.env.REACT_APP_API_URL + '/login', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: login.current.value,
						password: password.current.value,
					}),
				});
				const data = await res.json();
				setStatus(data.status);
				setToken(data.token);
			} catch (error) {
				console.log(error);
			}
		})();

	};

	return (
		<div className="container login_container">
			<div className="login_wrapper">
				<h2 className="login_title">Kirish</h2>
				<form onSubmit={loginSubmit}>
					<input
						required
						ref={login}
						type="text"
						placeholder="Login"
						style={
							status === 404
								? {
									border: "1px solid #D61F1F",
								}
								: {}
						}
					/>
					<input
						required
						ref={password}
						type="password"
						placeholder="Parol"
						style={
							status === 401
								? {
									border: "1px solid #D61F1F",
								}
								: {}
						}
					/>
					<button type="submit">Kirish</button>
				</form>
			</div>
		</div>
	);
}

export default Login;