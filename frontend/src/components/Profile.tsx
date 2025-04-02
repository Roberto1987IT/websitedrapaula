import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format, differenceInYears } from "date-fns";
import "../styles/Profile.css";

interface ProfileData {
  full_name: string;
  age?: number; // Make optional since we'll calculate it
  gender: string;
  phone: string;
  birth_date?: string; // Make optional
  birthday?: string; // Alternative field name
  country: string;
  email: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (birthDate: string | undefined): number | null => {
    if (!birthDate) return null;
    try {
      return differenceInYears(new Date(), new Date(birthDate));
    } catch {
      return null;
    }
  };

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
        timeout: 10000
      });

      // Handle both response structures and field name variations
      const responseData = response.data.user || response.data;

      if (!responseData) {
        throw new Error("Empty profile data received");
      }

      // Check for alternative field names (birthday vs birth_date)
      const birthDate = responseData.birth_date || responseData.birthday;
      const age = calculateAge(birthDate) || responseData.age;

      const processedData: ProfileData = {
        full_name: responseData.full_name || "N/A",
        age: age || undefined,
        gender: responseData.gender || "N/A",
        phone: responseData.phone || "N/A",
        birth_date: birthDate || undefined,
        country: responseData.country || "N/A",
        email: responseData.email || "N/A"
      };

      setProfileData(processedData);
    } catch (error) {
      console.error("Profile fetch error:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("access");
          navigate("/login");
          return;
        }
        setError(error.response?.data?.message || "Server error");
      } else {
        setError("Failed to load profile");
      }
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
  }, [navigate]);

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
        <button className="retry-button" onClick={fetchProfile}>
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
        
        {profileData.age !== undefined && (
          <div className="profile-item">
            <span className="profile-label">Idade</span>
            <div className="profile-value">{profileData.age}</div>
          </div>
        )}
        
        <div className="profile-item">
          <span className="profile-label">Genero</span>
          <div className="profile-value">{profileData.gender || "N/A"}</div>
        </div>
        
        <div className="profile-item">
          <span className="profile-label">Telefone</span>
          <div className="profile-value">{profileData.phone || "N/A"}</div>
        </div>
        
        {(profileData.birth_date || profileData.birthday) && (
          <div className="profile-item">
            <span className="profile-label">Data de Nascimento</span>
            <div className="profile-value">
              {format(
                new Date(profileData.birth_date || profileData.birthday!), 
                "MMMM d, yyyy"
              )}
            </div>
          </div>
        )}
        
        <div className="profile-item">
          <span className="profile-label">País</span>
          <div className="profile-value">{profileData.country || "N/A"}</div>
        </div>
        
        <div className="profile-item">
          <span className="profile-label">Email</span>
          <div className="profile-value">{profileData.email || "N/A"}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;