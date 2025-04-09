import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/courses.css";
import { courses } from "../courseData";
import { useTranslation } from "react-i18next";

// Update the component to accept an id prop
const Courses = ({ id }: { id: string }) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isCoursesVisible, setIsCoursesVisible] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
  const { t } = useTranslation();
  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => [...prev, id]);
  };

  useEffect(() => {
    const textTimer = setTimeout(() => setIsTextVisible(true), 200);
    const coursesTimer = setTimeout(() => setIsCoursesVisible(true), 400);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(coursesTimer);
    };
  }, []);

  return (
    // Add the id prop to the section element
    <section id={id} className="courses-section">
      <div className="courses-container-main">
        <header className="courses-header">
          <h2 className={`courses-title ${isTextVisible ? "fade-in" : ""}`}>
            {t("tranings_courses")}
          </h2>
          <p className={`courses-subtitle ${isTextVisible ? "fade-in" : ""}`}>

          </p>
        </header>

        <div className={`courses-grid ${isCoursesVisible ? "fade-in" : ""}`}>
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-item"
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              <Link to={`/course/${course.id}`} className="course-link">
                <div
                  className={`course-card ${
                    hoveredCourse === course.id ? "hovered" : ""
                  } ${course.id === 3 ? "special-course" : ""}`}
                >
                  <div className="course-image-wrapper">
                    <img
                      src={course.image}
                      alt={course.title}
                      className={`course-image ${
                        loadedImages.includes(course.id) ? "loaded" : ""
                      }`}
                      onLoad={() => handleImageLoad(course.id)}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="course-overlay">
                      <span className="course-action">Ver curso</span>
                    </div>
                  </div>
                  <h3 className="course-title">{t(`courses.${course.id}.title`)}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;