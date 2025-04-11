import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import '../../styles/pages/login.css';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${config.backendUrl}/api/auth/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Use 'username' if your Django backend expects it
                    // username: email,
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || 
                    data.message || 
                    (data.email ? data.email[0] : null) || 
                    (data.password ? data.password[0] : null) || 
                    'Login failed. Please try again.'
                );
            }

            // Store tokens
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            
            // Redirect to home or previous protected page
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred during login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-bg">
                <img src="/path-to-your-background-image.jpg" alt="Background" />
            </div>
            <div className="auth-container">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                            disabled={isLoading}
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
                        <a href="/forgot-password">{t("account.login.reset_password")}</a>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Conectando...' : 'Fazer login'}
                    </button>
                </form>
                <p>
                {t("account.login.not_member")} <a href="/register">{t("registration")}</a>
                </p>
            </div>
        </div>
    );
};

export default Login;