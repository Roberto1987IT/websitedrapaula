import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/pages/login.css'; // Updated relative path to CSS

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page refresh
        console.log('Logging in with:', { email, password });

        // Simulate login logic (replace with actual API call)
        if (email === 'tesla@gmail.com' && password === '12345678') {
            // Use a valid JWT token for testing
            const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImV4cCI6MTk0NzYwMDAwMH0.4f9d4c9d4c9d4c9d4c9d4c9d4c9d4c9d4c9d4c9d4c9';
            localStorage.setItem('access', mockToken);
            navigate('/'); // Redirect to the home page
        } else {
            alert('Invalid email or password'); // Handle invalid login
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-bg">
                <img src="/path-to-your-background-image.jpg" alt="Background" />
            </div>
            <div className="auth-container">
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12c1.5-4.5 6-7.5 9.75-7.5s8.25 3 9.75 7.5c-1.5 4.5-6 7.5-9.75 7.5S3.75 16.5 2.25 12z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223a10.477 10.477 0 00-.73 1.277C2.25 12 6 15 12 15c1.5 0 2.91-.3 4.17-.84m3.65-2.16c.3-.45.56-.93.79-1.44M9.75 9.75a3.75 3.75 0 015.25 5.25M3 3l18 18"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;