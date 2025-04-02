import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const REGISTER_ENDPOINT = '/api/register';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        phone: '',
        password: '',
        accept_terms: false,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Registration successful:', response.data);
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle HTML error responses
                if (typeof error.response?.data === 'string') {
                    console.error('Registration Error (HTML response):', error.response.data);
                    setErrors({ error: error.response.data }); // Display the HTML error in the frontend
                } else {
                    console.error('Registration Error:', error.response?.data);
                    setErrors(error.response?.data || {}); // Handle JSON error responses
                }
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
                    autocomplete="email" // Added autocomplete attribute
                    required
                />
            </div>
            <div>
                <label htmlFor="full_name">Full Name:</label>
                <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    autocomplete="name" // Added autocomplete attribute
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autocomplete="tel" // Added autocomplete attribute
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
                    autocomplete="new-password" // Added autocomplete attribute
                    required
                />
            </div>
            <div>
                <label htmlFor="accept_terms">
                    <input
                        type="checkbox"
                        id="accept_terms"
                        name="accept_terms"
                        checked={formData.accept_terms}
                        onChange={handleChange}
                        autocomplete="off" // Explicitly disable autocomplete for checkboxes
                        required
                    />
                    Accept Terms and Conditions
                </label>
            </div>
            {errors.error && <p className="error">{errors.error}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;