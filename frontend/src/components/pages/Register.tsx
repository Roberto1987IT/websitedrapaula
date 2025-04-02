import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/register.css";
import { countries } from "../../data/countries";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  gender: string;
  country: string;
  birthDate: string;
  acceptTerms: boolean;
}

interface BackendErrors {
  email?: string[];
  password?: string[];
  password2?: string[];
  full_name?: string[];
  phone?: string[];
  gender?: string[];
  country?: string[];
  birthday?: string[];
  accept_terms?: string[];
  non_field_errors?: string[];
}

// Using 127.0.0.1 instead of localhost to prevent DNS issues
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const REGISTER_ENDPOINT = `${API_BASE_URL}/api/auth/register/`;

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    gender: "",
    country: "",
    birthDate: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const navigate = useNavigate();

  // Password strength calculator
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (formData.password.length >= 12) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;

    setPasswordStrength(Math.min(strength, 5));
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = "Phone number is too short";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    return phone.startsWith('+') ? `+${digits}` : digits;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      email: formData.email,
      full_name: formData.fullName,
      phone: formatPhoneNumber(formData.phone),
      password: formData.password,
      password2: formData.confirmPassword, // Include password2
      accept_terms: formData.acceptTerms, // Include accept_terms
      gender: formData.gender || null, // Optional fields
      country: formData.country || null,
      birthday: formData.birthDate || null,
    };

    try {
      const response = await axios.post(REGISTER_ENDPOINT, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration Error:', error.response?.data);

        // Map backend errors to frontend errors
        const backendErrors = error.response?.data as BackendErrors;
        const mappedErrors: Record<string, string> = {};

        if (backendErrors.email) mappedErrors.email = backendErrors.email[0];
        if (backendErrors.password) mappedErrors.password = backendErrors.password[0];
        if (backendErrors.password2) mappedErrors.confirmPassword = backendErrors.password2[0];
        if (backendErrors.full_name) mappedErrors.fullName = backendErrors.full_name[0];
        if (backendErrors.phone) mappedErrors.phone = backendErrors.phone[0];
        if (backendErrors.gender) mappedErrors.gender = backendErrors.gender[0];
        if (backendErrors.country) mappedErrors.country = backendErrors.country[0];
        if (backendErrors.birthday) mappedErrors.birthDate = backendErrors.birthday[0];
        if (backendErrors.accept_terms) mappedErrors.acceptTerms = backendErrors.accept_terms[0];
        if (backendErrors.non_field_errors) setServerError(backendErrors.non_field_errors[0]);

        setErrors(mappedErrors);
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };

  const renderPasswordStrength = () => {
    if (!formData.password) return null;

    const strengthText = [
      "Very Weak",
      "Weak",
      "Moderate",
      "Strong",
      "Very Strong",
      "Excellent"
    ][passwordStrength];

    return (
      <div className="password-strength">
        <div className="strength-meter">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={`strength-bar ${i <= passwordStrength ? 'active' : ''}`}
              data-strength={i}
            ></div>
          ))}
        </div>
        <span className="strength-text">{strengthText}</span>
      </div>
    );
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <h2>Create Your Account</h2>
        {serverError && (
          <div className="server-error">
            {serverError}
            <button onClick={() => setServerError(null)} className="close-error">
              ×
            </button>
          </div>
        )}
        
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={errors.email ? "error-input" : ""}
              placeholder="example@domain.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password* (min 8 characters)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
              className={errors.password ? "error-input" : ""}
              placeholder="At least 8 characters"
            />
            {renderPasswordStrength()}
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className={errors.confirmPassword ? "error-input" : ""}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoComplete="name"
              className={errors.fullName ? "error-input" : ""}
              placeholder="First and last name"
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="tel"
              className={errors.phone ? "error-input" : ""}
              placeholder="+CountryCodeNumber"
            />
            <small className="hint">Example: +351912345678</small>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? "error-input" : ""}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
              <option value="PNS">Prefer not to say</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? "error-input" : ""}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          {/* Birth Date */}
          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={errors.birthDate ? "error-input" : ""}
            />
            {errors.birthDate && <span className="error">{errors.birthDate}</span>}
          </div>

          {/* Terms Checkbox */}
          <div className={`form-group terms-checkbox ${errors.acceptTerms ? 'error' : ''}`}>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className={errors.acceptTerms ? "error-input" : ""}
            />
            <label htmlFor="acceptTerms">
              I accept the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </label>
            {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Registering...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login Link */}
          <p className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;