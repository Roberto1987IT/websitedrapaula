import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/register.css";
import { countries } from "../../data/countries";
import ReactSelect from "react-select";

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
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);
  const navigate = useNavigate();

  const countryOptions = countries.map((c) => ({
    value: c.code,
    label: `${c.phoneCode} (${c.code})`,
  }));

  // Check if password has been breached using Have I Been Pwned API
  const checkPasswordBreach = async (password: string): Promise<boolean> => {
    try {
      // Hash the password using SHA-1
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      
      // Check first 5 characters against HIBP API
      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);
      
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const results = await response.text();
      
      return results.includes(suffix);
    } catch (error) {
      console.error("Error checking password breach:", error);
      return false; // Fail safe - don't block if API is unavailable
    }
  };

  // Password strength calculator
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    // Length requirements
    if (formData.password.length >= 8) strength += 1;
    if (formData.password.length >= 12) strength += 1;
    // Character diversity
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[a-z]/.test(formData.password)) strength += 1;
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

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    // Basic validations
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
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

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    // Enhanced password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Include at least one uppercase letter";
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = "Include at least one lowercase letter";
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Include at least one number";
      } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
        newErrors.password = "Include at least one special character";
      } else {
        // Only check breach if password meets other requirements
        setIsCheckingBreach(true);
        const isBreached = await checkPasswordBreach(formData.password);
        setIsCheckingBreach(false);
        if (isBreached) {
          newErrors.password = "This password has appeared in data breaches. Please choose a different one.";
        }
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phone: string, countryCode: string): string => {
    const country = countries.find(c => c.code === countryCode);
    const digits = phone.replace(/\D/g, '');
    return country ? `${country.phoneCode}${digits}` : digits;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const isValid = await validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      const payload = {
        email: formData.email,
        full_name: formData.fullName,
        phone: formatPhoneNumber(formData.phone, formData.country),
        password: formData.password,
        password2: formData.confirmPassword,
        accept_terms: formData.acceptTerms,
        gender: formData.gender || null,
        country: formData.country,
        birthday: formData.birthDate || null,
      };

      const response = await axios.post(REGISTER_ENDPOINT, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendErrors = error.response?.data as BackendErrors;
        const mappedErrors: Record<string, string> = {};

        if (backendErrors?.email) mappedErrors.email = backendErrors.email[0];
        if (backendErrors?.password) mappedErrors.password = backendErrors.password[0];
        if (backendErrors?.password2) mappedErrors.confirmPassword = backendErrors.password2[0];
        if (backendErrors?.full_name) mappedErrors.fullName = backendErrors.full_name[0];
        if (backendErrors?.phone) mappedErrors.phone = backendErrors.phone[0];
        if (backendErrors?.gender) mappedErrors.gender = backendErrors.gender[0];
        if (backendErrors?.country) mappedErrors.country = backendErrors.country[0];
        if (backendErrors?.birthday) mappedErrors.birthDate = backendErrors.birthday[0];
        if (backendErrors?.accept_terms) mappedErrors.acceptTerms = backendErrors.accept_terms[0];
        if (backendErrors?.non_field_errors) setServerError(backendErrors.non_field_errors[0]);

        setErrors(mappedErrors);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPasswordStrength = () => {
    if (!formData.password) return null;

    const strengthColors = [
      "#ff3e36", // Very weak
      "#ff691f", // Weak
      "#ffda36", // Moderate
      "#8bc34a", // Strong
      "#2ecc71", // Very strong
      "#27ae60"  // Excellent
    ];

    const strengthText = [
      "Muito Fraco",
      "Fraco",
      "Moderado",
      "Forte",
      "Muito Forte",
      "Excelente"
    ][passwordStrength];

    const requirements = [
      { met: formData.password.length >= 8, text: "8+ caracteres" },
      { met: /[A-Z]/.test(formData.password), text: "Letra maiúscula" },
      { met: /[a-z]/.test(formData.password), text: "letra minúscula" },
      { met: /[0-9]/.test(formData.password), text: "Numero" },
      { met: /[^A-Za-z0-9]/.test(formData.password), text: "Especial caracteres" }
    ];

    return (
      <div className="password-feedback">
        <div className="strength-meter">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={`strength-bar ${i <= passwordStrength ? 'active' : ''}`}
              style={{ backgroundColor: i <= passwordStrength ? strengthColors[passwordStrength] : '#e0e0e0' }}
            ></div>
          ))}
        </div>
        <div className="strength-info">
          <span className="strength-text" style={{ color: strengthColors[passwordStrength] }}>
            {strengthText}
          </span>
          {isCheckingBreach && (
            <span className="breach-check">Checking for breaches...</span>
          )}
        </div>
        <div className="password-requirements">
          {requirements.map((req, index) => (
            <span key={index} className={req.met ? "met" : ""}>
              {req.met ? "✓" : "•"} {req.text}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <h2>Crie Sua Conta</h2>
        {serverError && (
          <div className="server-error">
            {serverError}
            <button onClick={() => setServerError(null)} className="close-error">
              ×
            </button>
          </div>
        )}
        
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Personal Information */}
          <div className="form-group">
            <label htmlFor="fullName">Nome Completo</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoComplete="name"
              className={errors.fullName ? "error-input" : ""}
              placeholder="Primeiro e ultimo nome "
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <div className="phone-input-group">
              <ReactSelect
                id="country"
                name="country"
                options={countryOptions}
                value={countryOptions.find((option) => option.value === formData.country)}
                onChange={(selectedOption) =>
                  handleChange({
                    target: { name: "country", value: selectedOption?.value || "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                classNamePrefix="react-select"
                placeholder="Selecione seu país"
                isClearable
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                className={`phone-input ${errors.phone ? "error-input" : ""}`}
                placeholder="Telefone"
              />
            </div>
            {errors.phone && <span className="error">{errors.phone}</span>}
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gênero</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? "error-input" : ""}
            >
              <option value="">Selecionar gênero</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
              <option value="PNS">Prefiro nao dizer</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Data de Nascimento</label>
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

          {/* Account Information */}
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

          <div className="form-group">
            <label htmlFor="password">Password*</label>
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
              placeholder="Sua senha deve ter no mínimo 8 caracteres."
            />
            {renderPasswordStrength()}
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Password*</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className={errors.confirmPassword ? "error-input" : ""}
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          {/* Terms and Submit */}
          <div className={`form-group terms-checkbox ${errors.acceptTerms ? 'error' : ''}`}>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className={errors.acceptTerms ? "error-input" : ""}
              required
            />
            <label htmlFor="acceptTerms">
              Eu aceito os{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">Termos</a>{" "}
              e{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
            </label>
            {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || isCheckingBreach}
            className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Registrando...</span>
              </>
            ) : (
              "Criar Conta"
            )}
          </button>

          <p className="login-link">
            Já possui uma conta? <a href="/login">Fazer login</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;