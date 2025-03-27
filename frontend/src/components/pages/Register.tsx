import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/pages/register.css";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  age: string;
  gender: string;
  phone: string;
  birthDate: string;
  country: string;
  acceptTerms: boolean;
}

interface BackendErrors {
  email?: string[];
  password?: string[];
  confirm_password?: string[];
  full_name?: string[];
  age?: string[];
  gender?: string[];
  phone?: string[];
  birth_date?: string[];
  country?: string[];
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    birthDate: "",
    country: "",
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

    if (!formData.email) newErrors.email = "Email é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email inválido";

    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 8) newErrors.password = "Senha deve ter pelo menos 8 caracteres";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    if (!formData.fullName) newErrors.fullName = "Nome completo é obrigatório";

    if (!formData.phone) newErrors.phone = "Telefone é obrigatório";

    if (!formData.acceptTerms) newErrors.acceptTerms = "Você deve aceitar os termos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    const dataToSend = {
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      full_name: formData.fullName,
      age: formData.age ? parseInt(formData.age) : undefined,
      gender: formData.gender || undefined,
      phone: formData.phone,
      birth_date: formData.birthDate || undefined,
      country: formData.country || undefined
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/signup/", 
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken") || "",
          },
        }
      );

      if (response.status === 201) {
        alert("Registro concluído com sucesso!");
        navigate("/login");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const backendErrors = error.response.data;
        const errorMessages: Record<string, string> = {};

        // Map backend errors to form fields
        Object.entries(backendErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            errorMessages[field] = messages.join(", ");
          }
        });

        setErrors(errorMessages);
      } else {
        alert("Erro ao conectar ao servidor. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <h2>Registar Conta</h2>
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
          <label htmlFor="password">Senha* (mínimo 8 caracteres):</label>
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
          <label htmlFor="confirmPassword">Confirmar Senha*:</label>
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
          <label htmlFor="fullName">Nome Completo*:</label>
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
          <label htmlFor="phone">Telefone* (ex: +5511999999999):</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            className={errors.phone ? "error-input" : ""}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          {/* Age (Optional) */}
          <label htmlFor="age">Idade:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            autoComplete="off"
          />

          {/* Gender (Optional) */}
          <label htmlFor="gender">Gênero:</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>

          {/* Birth Date (Optional) */}
          <label htmlFor="birthDate">Data de Nascimento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />

          {/* Country (Optional) */}
          <label htmlFor="country">País:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            autoComplete="country"
          />

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
              Eu aceito os{" "}
              <a href="/termos" target="_blank" rel="noopener noreferrer">Termos</a>{" "}
              e{" "}
              <a href="/privacidade" target="_blank" rel="noopener noreferrer">Políticas</a>.
            </label>
            {errors.acceptTerms && <span className="error">{errors.acceptTerms}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? "Registrando..." : "Criar Conta"}
          </button>

          {/* Login Link */}
          <p className="login-link">
            Já tem uma conta? <a href="/login">Iniciar Sessão</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;