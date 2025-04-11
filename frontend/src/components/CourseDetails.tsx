import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom"; // Import useNavigate
import {Button} from "@/components/ui/button";  // Adjusted path
import React from "react";
import {useTranslation} from "react-i18next";
import {ChevronDown, ChevronUp, Check} from "lucide-react";
import {courses} from "../courseData";
import "../styles/pages/courseDetails.css";

const CourseDetails = () => {
    const {t} = useTranslation();
    const {id} = useParams<{ id: string | undefined }>();
    const navigate = useNavigate(); // Initialize navigate
    const course = courses.find((c) => c.id === Number(id));
        const [isInWishlist, setIsInWishlist] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    useEffect(() => {
        // Check if course is in wishlist (from localStorage)
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsInWishlist(wishlist.includes(Number(id)));

        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        console.log("Current login state:", localStorage.getItem("isLoggedIn"));
    }, []);

    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

        if (isInWishlist) {
            const newWishlist = wishlist.filter((itemId: number) => itemId !== Number(id));
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));
        } else {
            wishlist.push(Number(id));
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }

        setIsInWishlist(!isInWishlist);
    };

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const handleAddToCart = () => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        console.log("Login state:", {
            rawValue: localStorage.getItem("isLoggedIn"),
            interpretedAs: isLoggedIn,
        });

        if (!isLoggedIn) {
            // Redirect to login page with return URL
            navigate("/login", {state: {from: window.location.pathname}});
            return; // Exit the function to prevent further execution
        }

        // Add to cart logic (only if logged in)
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (!cart.includes(Number(id))) {
            cart.push(Number(id));
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(t("allert_msg.add_course"));
        } else {
            alert(t("allert_msg.course_already_in_cart"));
        }
    };

    if (!course) {
        return (
            <div className="course-details">
                <h1>Curso não encontrado</h1>
                <p>O curso que você está procurando não está disponível.</p>
            </div>
        );
    }

    return (
        <div className="course-details" data-course-id={course.id}>
            <h1>{t(`courses.${course.id}.title`)}</h1>

            <div className="course-image">
                {!imageLoaded && <div className="skeleton" style={{height: '300px'}}></div>}
                <img
                    src={course.image}
                    alt={course.title}
                    onLoad={() => setImageLoaded(true)}
                    style={{display: imageLoaded ? 'block' : 'none'}}
                />
            </div>

            <div className="course-content">
                <div className="course-info">
                    <section>
                        <h2>{t(`courses.${course.id}.description_course`)}</h2>
                        <div className="description-container">
                            <div className={`description-text ${!isDescriptionExpanded ? 'collapsed' : ''}`}>
                                <div className="description-structure">
                                    {course.title?.includes("Brincar e TO") && (
                                        <>
                                            <h3 className="description-subtitle">{t(`courses.${course.id}.about_course`)}</h3>
                                            <p>{t(`courses.${course.id}.about_course_p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.equipaments`)}</h3>
                                            <p>{t(`courses.${course.id}.equipaments_p1`)}</p>
                                            <p>{t(`courses.${course.id}.equipaments_p2`)}</p>
                                            <p>{t(`courses.${course.id}.equipaments_p3`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.course_content_title1`)}</h3>
                                            <div className="content-list">
                                                <ul>
                                                    <li>{t(`courses.${course.id}.course_content_title1_li.1`)}</li>
                                                    <li>{t(`courses.${course.id}.course_content_title1_li.2`)}</li>
                                                    <li>{t(`courses.${course.id}.course_content_title1_li.3`)}</li>
                                                    <li>{t(`courses.${course.id}.course_content_title1_li.4`)}</li>
                                                    <li>{t(`courses.${course.id}.course_content_title1_li.5`)}</li>
                                                </ul>
                                            </div>

                                            <div className="content-subcategory">
                                                <h4 className="description-subtitle-secondary">{t(`courses.${course.id}.course_content_title2`)}</h4>
                                                <div className="content-list">
                                                    <ul>
                                                        <li>{t(`courses.${course.id}.course_content_title2_li.1`)}</li>
                                                        <li>{t(`courses.${course.id}.course_content_title2_li.2`)}</li>
                                                        <li>{t(`courses.${course.id}.course_content_title2_li.3`)}</li>
                                                        <li>{t(`courses.${course.id}.course_content_title2_li.4`)}</li>
                                                        <li>{t(`courses.${course.id}.course_content_title2_li.5`)}</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="content-subcategory">
                                                <h4 className="description-subtitle-secondary">{t(`courses.${course.id}.course_content_title3`)}</h4>
                                                <div className="content-list">
                                                    <ul>
                                                        <li>{t(`courses.${course.id}.course_content_title3_li.1`)}</li>
                                                        <li>{t(`courses.${course.id}.course_content_title3_li.2`)}</li>
                                                        <li>{t(`courses.${course.id}.course_content_title3_li.3`)}</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.metodology_h`)}</h3>
                                            <p>{t(`courses.${course.id}.metodology_p`)}</p>
                                        </>
                                    )}

                                    {course.title?.includes("Raciocinio clinico e intervencao") && (
                                        <>
                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_1.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_1.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_2.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_2.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_3.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_3.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_4.title`)}</h3>
                                            <div className="content-list">
                                                <ul>
                                                    <li>{t(`courses.${course.id}.title_4.list.1`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.2`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.3`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.4`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.5`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.6`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.7`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.8`)}</li>
                                                </ul>
                                            </div>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_5.title`)}</h3>
                                            <div className="content-list">
                                                <ul>
                                                    <li>{t(`courses.${course.id}.title_5.list.1`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.2`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.3`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.4`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.5`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.6`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.7`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.8`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.9`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.10`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.11`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.12`)}</li>
                                                </ul>
                                            </div>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_6.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_6.p`)}</p>
                                        </>
                                    )}

                                    {course.title?.includes("Integracao Sensorial: Avaliacao") && (
                                        <>
                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_1.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_1.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_2.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_2.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_3.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_3.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_4.title`)}</h3>
                                            <div className="content-list">
                                                <ul>
                                                    <li>{t(`courses.${course.id}.title_4.list.1`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.2`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.3`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.4`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.list.5`)}</li>
                                                </ul>
                                            </div>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_5.title`)}</h3>
                                            <div className="content-list">
                                                <ul>
                                                    <li>{t(`courses.${course.id}.title_5.list.1`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.2`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.3`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.4`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.5`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.6`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.7`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.8`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.9`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.10`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.list.11`)}</li>
                                                </ul>
                                            </div>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_6.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_6.p`)}</p>
                                        </>
                                    )}

                                    {course.title?.includes("Avaliação e Raciocínio clínico na primeira Infância") && (
                                        <div data-course="Avaliacao">
                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_1.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_1.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_2.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_2.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_3.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_3.p`)}</p>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_4.title`)}</h3>
                                            <div className="content-list">
                                                <ul>
                                                    <li>{t(`courses.${course.id}.title_4.l1.1`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.l1.2`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.l1.3`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.l1.4`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.l1.5`)}</li>
                                                    <li>{t(`courses.${course.id}.title_4.l1.6`)}</li>
                                                </ul>
                                            </div>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_5.title`)}</h3>
                                            <div className="content-list">
                                                <ul>
                                                    <li>{t(`courses.${course.id}.title_5.l1.1`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.2`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.3`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.4`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.5`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.6`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.7`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.8`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.9`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.10`)}</li>
                                                    <li>{t(`courses.${course.id}.title_5.l1.11`)}</li>
                                                </ul>
                                            </div>

                                            <h3 className="description-subtitle">{t(`courses.${course.id}.title_6.title`)}</h3>
                                            <p>{t(`courses.${course.id}.title_6.p`)}</p>
                                        </div>
                                    )}

                                    {!course.title?.includes("Brincar e TO") &&
                                        !course.title?.includes("Raciocinio clinico e intervencao") &&
                                        !course.title?.includes("Integracao Sensorial: Avaliacao") &&
                                        !course.title?.includes("Avaliação e Raciocínio clínico na primeira Infância") && (
                                            <p>{course.description}</p>
                                        )}
                                </div>
                            </div>
                            <Button
                                variant="text"
                                size="small"
                                className="expand-button"
                                onClick={toggleDescription}
                            >
                                {isDescriptionExpanded ? (
                                    <>
                                        <span>{t("more_read")}</span>
                                        <ChevronUp className="h-4 w-4"/>
                                    </>
                                ) : (
                                    <>
                                        <span>{t("less_read")}</span>
                                        <ChevronDown className="h-4 w-4"/>
                                    </>
                                )}
                            </Button>
                        </div>
                    </section>

                    <section>
                        <h2>{t(`courses.${course.id}.teacher`)}</h2>
                        <p>{course.instructor}</p>
                    </section>

                    <section>
                        <h2>{t(`courses.${course.id}.localization.title`)}</h2>
                        <p>{t(`courses.${course.id}.localization.description`)}</p>
                    </section>

                    <section>
                        <h2>{t(`courses.${course.id}.a_date.title`)}</h2>
                        <p>{t(`courses.${course.id}.a_date.description`)}</p>
                    </section>
                </div>

                <div className="purchase-section">
                    <div className="purchase-card">
                        <div className="price">{course.price}</div>
                        <div className="button-container">
                            <button className="buy-button">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 6H21L19 16H5L3 6Z" stroke="currentColor" strokeWidth="2"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M8 21C8.55228 21 9 20.5523 9 20C9 19.4477 8.55228 19 8 19C7.44772 19 7 19.4477 7 20C7 20.5523 7.44772 21 8 21Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M16 21C16.5523 21 17 20.5523 17 20C17 19.4477 16.5523 19 16 19C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21Z"
                                        fill="currentColor"/>
                                </svg>
                                {t("buy_button")}
                            </button>
                            <button className="cart-button" onClick={handleAddToCart}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18C8.1 18 9 18.9 9 20Z"
                                        stroke="currentColor" strokeWidth="1.5"/>
                                    <path
                                        d="M20 20C20 21.1 19.1 22 18 22C16.9 22 16 21.1 16 20C16 18.9 16.9 18 18 18C19.1 18 20 18.9 20 20Z"
                                        stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M3 3H5.5L7.5 14H18L21 7" stroke="currentColor" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {t("add_to_cart")}
                            </button>

                            <div className="disclaimer-text">
                                {t("obs")}
                            </div>
                        </div>
                        <div className="contact-info">
                            {t("contact_by_mail")} <a
                            href="mailto:paulaserranoeducacao@gmail.com"
                            className="email-link">paulaserranoeducacao@gmail.com</a>
                        </div>
                    </div>

                    <div className="detalhes-adicionais">
                        <h2>{t("learning_on_course")}</h2>
                        <ul>
                            {course.learningOutcomes ? (
                                course.learningOutcomes.map((outcome, index) => (
                                    <li key={index}>
                                        <Check className="h-4 w-4 inline-block mr-2 text-green-600"/>
                                        {t(`courses.${course.id}.learningOutcomes.${index}`)}
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <Check className="h-4 w-4 inline-block mr-2 text-green-600"/>
                                    Informações sobre o conteúdo do curso em breve.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// When login is successful:
localStorage.setItem("isLoggedIn", "true"); // Use string "true"

export default CourseDetails;