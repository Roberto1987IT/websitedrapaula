import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        phone: '',
        password: '',
        acceptTerms: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post('/api/register', formData);
            console.log('Registration successful:', response.data);
            setSuccess(true);
            // Reset form after successful registration
            setFormData({
                email: '',
                fullName: '',
                phone: '',
                password: '',
                acceptTerms: false,
            });
        } catch (error: any) {
            if (error.response) {
                // Handle Django validation errors
                const errorMessage = error.response.data.message || 
                                  error.response.data.detail || 
                                  'Registration failed';
                setError(errorMessage);
            } else if (error.request) {
                setError('No response from server. Please check your connection.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="registration-form">
            <h2>Create Account</h2>
            
            {success && (
                <div className="alert alert-success">
                    Registration successful! Please check your email to verify your account.
                </div>
            )}

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group checkbox">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                    <label htmlFor="acceptTerms">
                        I accept the Terms and Conditions
                    </label>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading || !formData.acceptTerms}
                    className={isLoading ? 'loading' : ''}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            Processing...
                        </>
                    ) : (
                        'Register'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Register;