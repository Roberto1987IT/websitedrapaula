import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../styles/Profile.css";

interface ProfileData {
  full_name: string;
  age: number;
  gender: string;
  phone: string;
  birth_date: string;
  country: string;
  email: string;
  user?: {
    email: string;
  };
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("http://localhost:8000/api/users/profile/", {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        timeout: 10000 // 10 second timeout
      });

      // Handle both possible response structures:
      // 1. { user: { ...profileData } } 
      // 2. Direct profile data { ...profileData }
      const responseData = response.data.user || response.data;

      if (!responseData) {
        throw new Error("Empty profile data received");
      }

      // Ensure required fields exist
      const processedData: ProfileData = {
        full_name: responseData.full_name || "N/A",
        age: responseData.age || 0,
        gender: responseData.gender || "N/A",
        phone: responseData.phone || "N/A",
        birth_date: responseData.birth_date || "",
        country: responseData.country || "N/A",
        email: responseData.user?.email || responseData.email || "N/A",
        user: {
          email: responseData.user?.email || responseData.email || "N/A"
        }
      };

      setProfileData(processedData);
      setError(null);

    } catch (error) {
      console.error("Profile fetch error:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem("access");
          navigate("/login");
          return;
        }
        
        setError(
          error.response?.data?.message || 
          `Server error: ${error.response?.status || "Unknown"}`
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, [navigate]); // Add other dependencies if needed
  
    // Loading and error states
    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      );
    }
  
    if (error || !profileData) {
      return (
        <div className="error-message">
          <h3>Profile Loading Failed</h3>
          <p>{error || "Unknown error occurred"}</p>
          <button 
            className="retry-button"
            onClick={fetchProfile}
          >
            Try Again
          </button>
        </div>
      );
    }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">Perfil</h1>
      </div>
      <div className="profile-grid">
        <div className="profile-item">
          <span className="profile-label">Nome</span>
          <div className="profile-value">{profileData.full_name || "N/A"}</div>
        </div>
        <div className="profile-item">
          <span className="profile-label">Idade</span>
          <div className="profile-value">{profileData.age || "N/A"}</div>
        </div>
        <div className="profile-item">
          <span className="profile-label">Genero</span>
          <div className="profile-value">{profileData.gender || "N/A"}</div>
        </div>
        <div className="profile-item">
          <span className="profile-label">Telefone</span>
          <div className="profile-value">{profileData.phone || "N/A"}</div>
        </div>
        <div className="profile-item">
          <span className="profile-label">Data de Nascimento</span>
          <div className="profile-value">
            {profileData.birth_date
              ? format(new Date(profileData.birth_date), "MMMM d, yyyy")
              : "N/A"}
          </div>
        </div>
        <div className="profile-item">
          <span className="profile-label">País</span>
          <div className="profile-value">{profileData.country || "N/A"}</div>
        </div>

        <div className="profile-item">
          <span className="profile-label">Email</span>
          <div className="profile-value">
            {profileData.user?.email || profileData.email || "N/A"}
          </div>
        </div>

        <div className="profile-item">
          <span className="profile-label">Conta</span>
          <div className="profile-value">
            {profileData.user?.email || profileData.email || "Pessoal"}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
