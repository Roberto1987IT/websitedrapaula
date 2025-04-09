import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Navigation from "./components/Navigation";
import Banner from "./components/Banner";
import Courses from "./components/Courses";
import Mentorship from "./components/pages/Mentorship";
import Books from "./components/pages/Books";
import About from "./components/pages/About";
import Imersoes from "./components/pages/Imersoes";
import Lancamentos from "./components/pages/Lancamentos";
import Testemunhos from "./components/pages/Testemunhos";
import ContactForm from "./components/pages/ContactForm";
import Footer from "./components/pages/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RecuperarSenha from "./components/pages/RecuperarSenha";
import Wishlist from "./components/pages/Wishlist";
import Contact from "./components/Contact";
import Cart from "./components/pages/Cart";
import CourseDetails from "./components/CourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import "./styles/global.css";
import CookieConsent from "react-cookie-consent";
import NossosValores from "./components/pages/NossosValores";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArtigosTeses from "./components/pages/ArtigosTeses";
import MentorshipDetails from './components/pages/MentorshipDetails';
import BookDetails from "./components/pages/BookDetails";
import AboutDetail from "./components/pages/AboutDetail";
import ImersaoDetails from "./components/pages/ImersaoDetails"; 
import LancamentoDetail from './components/pages/LancamentoDetail';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Politica from "./components/Politica";
import PoliticaCookies from "./components/PoliticaCookies";
import TermosCondicoes from "./components/TermosCondicoes";
import "./i18n";

// Placeholder for a protected Dashboard page
const Dashboard = () => <div>Dashboard (Protected)</div>;

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Banner />
      <Courses id="cursos" />
      <Mentorship id="mentorias" />
      <Books id="livros" />
      <About id="about" />
      <Imersoes id="imersoes" />
      <Lancamentos />
      <Testemunhos />
      <ContactForm />
      <Footer />
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
      <CartProvider> {/* Add CartProvider here */}
        <Router>
          <ScrollToTop />
          <Navigation />
          <CookieConsent
            location="bottom"
            buttonText="Aceitar"
            declineButtonText="Recusar"
            cookieName="myCookieConsent"
            style={{
              background: "#ffffff",
              color: "#333",
              padding: "10px 20px",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              fontSize: "14px",
              fontFamily: "Arial, sans-serif",
            }}
            buttonStyle={{
              background: "#4CAF50",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            declineButtonStyle={{
              background: "#f44336",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            expires={150}
            enableDeclineButton
            onDecline={() => {
              console.log("User declined cookies");
            }}
            overlay
            overlayStyle={{
              background: "rgba(0,0,0,0.5)",
            }}
          >
            Este site utiliza cookies para melhorar a sua experiência. Ao continuar, você concorda com o uso de cookies.{" "}
            <Link to="/privacy" style={{ color: "#007bff", textDecoration: "underline" }}>
              Saiba mais
            </Link>
          </CookieConsent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-detail" element={<AboutDetail />} />
            <Route path="/nossos-valores" element={<NossosValores />} />
            <Route path="/cursos" element={<Courses id="cursos" />} />
            <Route path="/mentorias" element={<Mentorship id="mentorias" />} />
            <Route path="/imersoes" element={<Imersoes id="imersoes" />} />
            <Route path="/artigos-teses" element={<ArtigosTeses />} />
            <Route path="/mentorship-details" element={<MentorshipDetails />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/imersao-details" element={<ImersaoDetails />} />
            <Route path="/lancamento/:id" element={<LancamentoDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/politica" element={<Politica />} />
            <Route path="/politica-cookies" element={<PoliticaCookies />} />
            <Route path="/termos-condicoes" element={<TermosCondicoes />} />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>

          <WhatsAppButton 
            phoneNumber="351964309035"
            message="Olá, eu gostaria de saber mais informações..."
          />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;