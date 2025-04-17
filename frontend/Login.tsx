import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/pages/login.css';

const LOGIN_ENDPOINT = '/api/auth/token';  // Ensure this matches the backend endpoint

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ error?: string }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful:', response.data);
            // Redirect to dashboard or home page after successful login
            navigate('/dashboard');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login Error:', error.response?.data);
                setErrors(error.response?.data || {});
            } else {
                console.error('Unexpected Error:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {errors.error && <p className="error">{errors.error}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
