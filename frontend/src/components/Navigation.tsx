import { useState, useEffect, useRef } from "react";
import { Menu, X, Heart, ShoppingBag, User, ChevronDown, LogIn, UserPlus, UserCircle, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import logo from "../assets/20.png";
import "../styles/navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState({
    navDropdown: null as string | null,
    userDropdown: false,
  });
  const [language, setLanguage] = useState<"PT" | "EN">("PT");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // Added scroll position state
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigationLinks = [
    { label: "Home", href: "/nossos-valores" },
    {
      label: "Conheca a Paula Serrano",
      href: "#about",
    },
    {
      label: "Formações",
      href: "#",
      subItems: [
        { label: "Cursos", href: "#cursos" },
        { label: "Mentorias", href: "#mentorias" },
        { label: "Imersoes", href: "#imersoes" },
      ],
    },
    
    {
      label: "Recursos",
      href: "#",
      subItems: [
        { label: "Livros e ebooks", href: "#livros" },
        { label: "Artigos e teses", href: "/artigos-teses" },
      ],
    },
    { label: "Contacto", href: "/contact" },
  ];

  // Function to check if the token is expired
  const isTokenExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat as expired if decoding fails
    }
  };

  // Check login status and fetch user profile
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
      setTokenExpired(false);
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/user/profile/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserName(response.data.full_name);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            handleLogout();
          }
        }
      };
      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setTokenExpired(true);
    }
  }, [location]);

  const toggleDropdown = (label: string) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      navDropdown: prev.navDropdown === label ? null : label,
    }));
  };

  const toggleUserDropdown = () => {
    setActiveDropdowns((prev) => ({
      ...prev,
      userDropdown: !prev.userDropdown,
    }));
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Section with id "${sectionId}" not found.`);
      scrollToTop(); // Fallback to top if the section is not found
    }
  };

  const closeMobileMenu = () => {
    if (isMenuOpen && mobileMenuRef.current) {
      mobileMenuRef.current.classList.remove('open');
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500); // Match transition time
    }
  };

  const handleLinkClick = (href: string) => {
    // First close the mobile menu
    closeMobileMenu();
    
    // Reset all dropdowns
    setActiveDropdowns({ navDropdown: null, userDropdown: false });
    
    // Handle navigation with a slight delay to allow animation to start
    setTimeout(() => {
      if (href.startsWith("#")) {
        const sectionId = href.substring(1);
  
        if (location.pathname === "/") {
          // If already on the home page, scroll to the section
          scrollToSection(sectionId);
        } else {
          // If on another page, navigate to the home page and THEN scroll
          navigate("/"); // Navigate to home first
          setTimeout(() => {  //wait for page to load
            scrollToSection(sectionId); //scroll to the section
          }, 100);
        }
      } else {
        // For non-hash links, just navigate normally
        navigate(href);
        scrollToTop();  //Scroll to the top
      }
    }, 10); // Small delay to ensure the closing animation starts
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    setUserName("");
    setTokenExpired(true);
    setActiveDropdowns({ navDropdown: null, userDropdown: false });
    closeMobileMenu();
    navigate("/login");
    scrollToTop();
  };

  const toggleMobileMenu = () => {
    const mobileMenu = mobileMenuRef.current;
    if (mobileMenu) {
      if (!isMenuOpen) {
        setIsMenuOpen(true);
        setTimeout(() => {
          mobileMenu.classList.add('open');
        }, 10);
      } else {
        mobileMenu.classList.remove('open');
        setTimeout(() => {
          setIsMenuOpen(false);
        }, 500); // Match transition time
      }
    }
  };

  //Listen to scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //This useEffect takes care of closing mobile menu on certain situations
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setActiveDropdowns(prev => ({ ...prev, userDropdown: false }));
      }
      let clickedOutsideAllDropdowns = true;
      Object.entries(dropdownRefs.current).forEach(([label, ref]) => {
        if (ref && ref.contains(event.target as Node)) {
          clickedOutsideAllDropdowns = false;
        }
      });
      if (clickedOutsideAllDropdowns) {
        setActiveDropdowns(prev => ({ ...prev, navDropdown: null }));
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdowns({ navDropdown: null, userDropdown: false });
        closeMobileMenu();
      }
    };

    const handleRouteChange = () => {
      closeMobileMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Calculate background color opacity based on scroll position
  const navbarOpacity = Math.min(1, scrollPosition / 200); // Adjust the divisor to control the sensitivity

  return (
    <nav className="navbar" style={{ backgroundColor: `rgba(255, 255, 255, ${0.95 - navbarOpacity * 0.3})` }}>
      <div className="navbar-container">
        <div className="navbar-main">
          <div className="navbar-logo">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                window.location.href = "/";
                scrollToTop();
              }}
            >
              <img src={logo} alt="Logo" className="logo-img" />
            </a>
          </div>

          <div className="navbar-links desktop">
            {navigationLinks.map((link) => (
              <div
                key={link.label}
                className={`dropdown-container ${activeDropdowns.navDropdown === link.label ? 'active' : ''}`}
                ref={(el) => {
                  dropdownRefs.current[link.label] = el;
                }}
              >
                {link.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="dropdown-trigger"
                      aria-expanded={activeDropdowns.navDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown className="dropdown-icon" />
                    </button>
                    <div className="dropdown-menu">
                      {link.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(subItem.href);
                          }}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="navbar-icons">
            <div
              className={`user-icon-wrapper ${activeDropdowns.userDropdown ? 'active' : ''}`}
              ref={userDropdownRef}
            >
              <User
                className="icon"
                color={isLoggedIn && !tokenExpired ? "green" : "black"}
                onClick={toggleUserDropdown}
                aria-expanded={activeDropdowns.userDropdown}
                aria-haspopup="true"
              />
              {isLoggedIn && (
                <div className="hover-message">
                  {tokenExpired ? "Your login has expired" : `Bem vindo(a) ${userName}`}
                </div>
              )}
              <div className="user-dropdown-menu">
                {isLoggedIn ? (
                  <>
                    <button
                      className="user-dropdown-button"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/profile");
                        toggleUserDropdown();
                        scrollToTop();
                      }}
                    >
                      <UserCircle size={18} />
                      Perfil
                    </button>
                    <button
                      className="user-dropdown-button"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="user-dropdown-button"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/login");
                        toggleUserDropdown();
                        scrollToTop();
                      }}
                    >
                      <LogIn size={18} />
                      Iniciar sessão
                    </button>
                    <button
                      className="user-dropdown-button"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/register");
                        toggleUserDropdown();
                        scrollToTop();
                      }}
                    >
                      <UserPlus size={18} />
                      Criar uma conta
                    </button>
                  </>
                )}
              </div>
            </div>
            <Heart
              className="icon"
              onClick={() => {
                closeMobileMenu();
                handleWishlistClick();
                scrollToTop();
              }}
              aria-label="Wishlist"
            />
            <ShoppingBag
              className="icon"
              onClick={() => {
                closeMobileMenu();
                navigate("/cart");
                scrollToTop();
              }}
              aria-label="Shopping Cart"
            />

            <div className="language-selector desktop">
              {["PT", "EN"].map((lang) => (
                <button
                  key={lang}
                  className={language === lang ? "active" : ""}
                  onClick={() => setLanguage(lang as "PT" | "EN")}
                  aria-pressed={language === lang}
                >
                  {lang} {lang === "PT" ? "🇵🇹" : "🇬🇧"}
                </button>
              ))}
            </div>
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div
          className={`mobile-menu ${isMenuOpen ? '' : ''}`}
          ref={mobileMenuRef}
        >
          {navigationLinks.map((link) => (
            <div
              key={link.label}
              className={`mobile-dropdown-container ${activeDropdowns.navDropdown === link.label ? 'active' : ''}`}
            >
              {link.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="mobile-dropdown-trigger"
                    aria-expanded={activeDropdowns.navDropdown === link.label}
                  >
                    {link.label}
                    <ChevronDown className="dropdown-icon" />
                  </button>
                  <div className="mobile-dropdown-menu">
                    {link.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(subItem.href);
                        }}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}

          {isLoggedIn ? (
            <>
              <button
                className="mobile-menu-button"
                onClick={() => {
                  closeMobileMenu();
                  navigate("/profile");
                  scrollToTop();
                }}
              >
                <UserCircle size={18} />
                Perfil
              </button>
              <button
                className="mobile-menu-button"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="mobile-menu-button"
                onClick={() => {
                  closeMobileMenu();
                  navigate("/login");
                  scrollToTop();
                }}
              >
                <LogIn size={18} />
                Iniciar sessão
              </button>
              <button
                className="mobile-menu-button"
                onClick={() => {
                  closeMobileMenu();
                  navigate("/register");
                  scrollToTop();
                }}
              >
                <UserPlus size={18} />
                Criar uma conta
              </button>
            </>
          )}

          <div className="mobile-language-selector">
            {["PT", "EN"].map((lang) => (
              <button
                key={lang}
                className={language === lang ? "active" : ""}
                onClick={() => {
                  setLanguage(lang as "PT" | "EN");
                  closeMobileMenu();
                }}
              >
                {lang} {lang === "PT" ? "🇵🇹" : "🇬🇧"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
