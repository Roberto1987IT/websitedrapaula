import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/register.css";

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
}

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
  const navigate = useNavigate();

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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.fullName) newErrors.fullName = "Full name is required";

    if (!formData.phone) newErrors.phone = "Phone number is required";

    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phone: string) => {
    // Ensure phone number starts with + and has only digits after
    return phone.startsWith('+') ? phone : `+${phone.replace(/\D/g, '')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    const dataToSend = {
      email: formData.email,
      password: formData.password,
      password2: formData.confirmPassword,
      full_name: formData.fullName,
      phone: formData.phone ? formatPhoneNumber(formData.phone) : null,
      gender: formData.gender || null,
      country: formData.country || null,
      birthday: formData.birthDate || null,
      accept_terms: formData.acceptTerms
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/signup/", 
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Backend error:", error.response.data);
        
        const backendErrors = error.response.data;
        const errorMessages: Record<string, string> = {};

        // Map backend field names to frontend names
        Object.entries(backendErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            const frontendField = field === 'password2' ? 'confirmPassword' : 
                                 field === 'full_name' ? 'fullName' :
                                 field === 'accept_terms' ? 'acceptTerms' : field;
            errorMessages[frontendField] = messages.join(", ");
          }
        });

        setErrors(errorMessages);
        
        if (!errorMessages.email && !errorMessages.password) {
          alert("Registration error: " + JSON.stringify(backendErrors));
        }
      } else {
        alert("Server connection error. Please try again.");
        console.error("Registration error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <h2>Register Account</h2>
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <label htmlFor="email">Email*:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          {/* Password Field */}
          <label htmlFor="password">Password* (min 8 characters):</label>
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
          />
          {errors.password && <span className="error">{errors.password}</span>}

          {/* Confirm Password */}
          <label htmlFor="confirmPassword">Confirm Password*:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className={errors.confirmPassword ? "error-input" : ""}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          {/* Full Name */}
          <label htmlFor="fullName">Full Name*:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            autoComplete="name"
            className={errors.fullName ? "error-input" : ""}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}

          {/* Phone */}
          <label htmlFor="phone">Phone* (e.g., +351912345678):</label>
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
          {errors.phone && <span className="error">{errors.phone}</span>}

          {/* Gender */}
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? "error-input" : ""}
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}

          {/* Country */}
          <label htmlFor="country">Country:</label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? "error-input" : ""}
          >
            <option value="">Select Country</option>
            <option value="PT">Portugal</option>
            <option value="BR">Brazil</option>
            <option value="US">United States</option>
            <option value="ES">Spain</option>
            <option value="FR">France</option>
            {/* Add more countries as needed */}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}

          {/* Birth Date */}
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={errors.birthday ? "error-input" : ""}
          />
          {errors.birthday && <span className="error">{errors.birthday}</span>}

          {/* Terms Checkbox */}
          <div className="terms-checkbox">
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
              <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
            </label>
            {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? "Registering..." : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;