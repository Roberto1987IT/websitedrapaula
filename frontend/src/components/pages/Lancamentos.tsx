import {useState, useEffect, useRef} from "react";
import {ChevronLeft, ChevronRight, Maximize2, Play} from "lucide-react";
import "../../styles/pages/carousel.css";
import {useTranslation} from "react-i18next";

// Import all images
import modulo1 from "../../assets/galleryPse/img6.jpeg";
import modulo2 from "../../assets/courses/curso4.jpg";
import modulo3 from "../../assets/courses/curso2.jpg";
import modulo4 from "../../assets/courses/curso3.jpg";
import modulo5 from "../../assets/courses/curso1.jpg";
import modulo6 from "../../assets/galleryPse/img2.jpeg";
import modulo7 from "../../assets/courses/curso5.jpg";
import modulo8 from "../../assets/courses/curso3.jpg";
import img1 from "../../assets/galleryPse/img1.jpeg";
import img2 from "../../assets/galleryPse/img2.jpeg";
import img3 from "../../assets/galleryPse/img3.jpeg";
import img4 from "../../assets/galleryPse/img4.jpeg";
import img5 from "../../assets/galleryPse/img5.jpeg";
import img6 from "../../assets/galleryPse/img6.jpeg";
import img7 from "../../assets/galleryPse/img7.jpeg";
import img8 from "../../assets/galleryPse/img8.jpg";
import img9 from "../../assets/galleryPse/img9.jpg";
import img10 from "../../assets/galleryPse/img10.jpg";

// Import all videos
import vid3 from "../../assets/galleryPse/vid3.mp4";
import vid5 from "../../assets/galleryPse/vid5.mp4";
import vid6 from "../../assets/galleryPse/vid6.mp4";
import vid7 from "../../assets/galleryPse/vid7.mp4";
import vid8 from "../../assets/galleryPse/vid8.mp4";
import vid12 from "../../assets/galleryPse/vid12.mp4";
import vid4 from "../../assets/galleryPse/vid4.mp4";

type MediaItem = {
    type: 'image' | 'video';
    src: string;
    title: string;
    thumbnail?: string;
};


const Lancamentos = () => {
    const {t} = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [animationDirection, setAnimationDirection] = useState("next");
    const [modalMedia, setModalMedia] = useState<null | MediaItem>(null);
    const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);
    const transitionTimeoutRef = useRef<number | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Calculate visible slides based on screen size
    const visibleSlides = isMobile ? 1 : 3;

    const mediaItems: MediaItem[] = [
        // Images
        {type: 'image', src: modulo3, title: t("galery_img.img1")},
        {type: 'image', src: modulo2, title: t("galery_img.img2")},
        {type: 'image', src: modulo1, title: t("galery_img.img3")},
        {type: 'image', src: modulo4, title: t("galery_img.img4")},
        {type: 'image', src: modulo5, title: t("galery_img.img5")},
        {type: 'image', src: modulo6, title: t("galery_img.img6")},
        {type: 'image', src: modulo7, title: t("galery_img.img7")},
        {type: 'image', src: modulo8, title: t("galery_img.img8")},
        {type: 'image', src: img1, title: t("galery_img.img9")},
        {type: 'image', src: img2, title: t("galery_img.img10")},
        {type: 'image', src: img3, title: t("galery_img.img11")},
        {type: 'image', src: img4, title: t("galery_img.img12")},
        {type: 'image', src: img5, title: t("galery_img.img13")},
        {type: 'image', src: img6, title: t("galery_img.img14")},
        {type: 'image', src: img7, title: t("galery_img.img15")},
        {type: 'image', src: img8, title: t("galery_img.img16")},
        {type: 'image', src: img9, title: t("galery_img.img17")},
        {type: 'image', src: img10, title: t("galery_img.img18")},

        // Videos
        {type: 'video', src: vid3, title: t("galery_img.img19"), thumbnail: img1},
        {type: 'video', src: vid5, title: t("galery_img.img20"), thumbnail: img2},
        {type: 'video', src: vid6, title: t("galery_img.img21"), thumbnail: img3},
        {type: 'video', src: vid7, title: t("galery_img.img22"), thumbnail: img4},
        {type: 'video', src: vid8, title: t("galery_img.img23"), thumbnail: img5},
        {type: 'video', src: vid12, title: t("galery_img.img24"), thumbnail: img6},
        {type: 'video', src: vid4, title: t("galery_img.img25"), thumbnail: img7},
    ];
    const maxIndex = Math.max(0, mediaItems.length - visibleSlides);


    useEffect(() => {
        setIsTextVisible(true);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const startAutoSlide = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = window.setInterval(() => {
                if (!isPaused && !isTransitioning) {
                    goToNextSlide();
                }
            }, 2000);
        };

        startAutoSlide();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, isTransitioning, isMobile]);

    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index >= activeIndex && index < activeIndex + visibleSlides) {
                    if (playingVideoIndex === index) {
                        video.play().catch(e => console.error("Video play failed:", e));
                    }
                } else {
                    video.pause();
                }
            }
        });
    }, [activeIndex, playingVideoIndex, visibleSlides]);

    const goToSlide = (index: number) => {
        if (isTransitioning) return;

        setAnimationDirection(index > activeIndex ? "next" : "prev");
        setIsTransitioning(true);
        setActiveIndex(Math.min(index, maxIndex));

        transitionTimeoutRef.current = window.setTimeout(() => {
            setIsTransitioning(false);
        }, 200);
    };

    const goToPrevSlide = () => {
        if (isTransitioning) return;

        setAnimationDirection("prev");
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => {
            // Loop to the last slide if at the beginning
            return prevIndex === 0 ? maxIndex : prevIndex - 1;
        });

        transitionTimeoutRef.current = window.setTimeout(() => {
            setIsTransitioning(false);
        }, 200);
    };

    const goToNextSlide = () => {
        if (isTransitioning) return;

        setAnimationDirection("next");
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => {
            // Loop to the first slide if at the end
            return prevIndex === maxIndex ? 0 : prevIndex + 1;
        });

        transitionTimeoutRef.current = window.setTimeout(() => {
            setIsTransitioning(false);
        }, 200);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsPaused(true);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsPaused(false);
        const touchDiff = touchStart - touchEnd;

        if (touchDiff > 75) {
            goToNextSlide();
        } else if (touchDiff < -75) {
            goToPrevSlide();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                goToPrevSlide();
            } else if (e.key === "ArrowRight") {
                goToNextSlide();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isTransitioning]);

    const openMediaModal = (item: MediaItem, index?: number) => {
        setModalMedia(item);
        setIsPaused(true);
        if (index !== undefined && item.type === 'video') {
            setPlayingVideoIndex(index);
        }
    };

    const closeMediaModal = () => {
        setModalMedia(null);
        setIsPaused(false);
        setPlayingVideoIndex(null);
    };

    const toggleVideoPlay = (index: number) => {
        if (playingVideoIndex === index) {
            setPlayingVideoIndex(null);
        } else {
            setPlayingVideoIndex(index);
        }
    };

    return (
        <section className="carousel-section" id="lancamentos" aria-label="Galeria de Mídia">
            <div className="carousel-container">
                <div className="carousel-header">
                    <h2 className={`carousel-title ${isTextVisible ? "fade-in" : ""}`}>
                        {t("news_h2")}
                    </h2>
                    <div className="carousel-subtitle-container">
                        <p className={`carousel-subtitle ${isTextVisible ? "fade-in" : ""}`}>
                            {t("news_p")}
                        </p>
                    </div>
                </div>

                <div
                    className="carousel-wrapper"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    ref={carouselRef}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Galeria de mídia"
                >
                    <button
                        className="carousel-arrow carousel-prev"
                        onClick={goToPrevSlide}
                        aria-label="Slide anterior"
                        disabled={isTransitioning || (activeIndex === 0 && visibleSlides >= mediaItems.length)}
                    >
                        <ChevronLeft size={24}/>
                    </button>

                    <div className="carousel-slides-container">
                        <div
                            className={`carousel-slides carousel-direction-${animationDirection} ${isTransitioning ? 'transitioning' : ''}`}
                            style={{
                                transform: `translateX(-${activeIndex * (100 / visibleSlides)}%)`,
                            }}
                            aria-live="polite"
                        >
                            {mediaItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`carousel-slide ${
                                        index >= activeIndex && index < activeIndex + visibleSlides ? "active" : ""
                                    }`}
                                    style={{width: `${100 / visibleSlides}%`}}
                                    aria-hidden={!(index >= activeIndex && index < activeIndex + visibleSlides)}
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={`${index + 1} de ${mediaItems.length}: ${item.title}`}
                                >
                                    <div className="carousel-slide-content">
                                        <div className="carousel-media-wrapper">
                                            {item.type === 'image' ? (
                                                <>
                                                    <img
                                                        src={item.src}
                                                        alt={item.title}
                                                        className="carousel-image"
                                                        loading={index < activeIndex + visibleSlides * 2 ? "eager" : "lazy"}
                                                        onClick={() => openMediaModal(item)}
                                                        onError={(e) => {
                                                            console.error(`Failed to load image for: ${item.title}`);
                                                            e.currentTarget.src = "https://via.placeholder.com/300x300?text=Imagem+Indisponível";
                                                        }}
                                                    />
                                                    <div className="carousel-overlay">
                                                        <button
                                                            className="carousel-expand-button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                openMediaModal(item);
                                                            }}
                                                            aria-label={`Expandir imagem: ${item.title}`}
                                                        >
                                                            <Maximize2 size={20}/>
                                                        </button>
                                                        <span className="carousel-action"
                                                              onClick={() => openMediaModal(item)}>Ampliar imagem</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="video-container">
                                                        <video
                                                            ref={el => {
                                                                videoRefs.current[index] = el;
                                                            }}
                                                            src={item.src}
                                                            className="carousel-video"
                                                            poster={item.thumbnail}
                                                            onClick={() => toggleVideoPlay(index)}
                                                            controls={playingVideoIndex === index}
                                                            muted
                                                            loop
                                                        />
                                                        {playingVideoIndex !== index && (
                                                            <div className="video-overlay"
                                                                 onClick={() => toggleVideoPlay(index)}>
                                                                <button className="play-button"
                                                                        aria-label="Reproduzir vídeo">
                                                                    <Play size={48}/>
                                                                </button>
                                                                <span className="video-title">{item.title}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="carousel-overlay">
                                                        <button
                                                            className="carousel-expand-button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                openMediaModal(item, index);
                                                            }}
                                                            aria-label={`Expandir vídeo: ${item.title}`}
                                                        >
                                                            <Maximize2 size={20}/>
                                                        </button>
                                                        <span className="carousel-action"
                                                              onClick={() => openMediaModal(item, index)}>Ampliar vídeo</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="carousel-content">
                                            <h3 className="carousel-slide-title">{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="carousel-arrow carousel-next"
                        onClick={goToNextSlide}
                        aria-label="Próximo slide"
                        disabled={isTransitioning || (activeIndex >= maxIndex && maxIndex !== 0)}
                    >
                        <ChevronRight size={24}/>
                    </button>
                </div>

                <div className="carousel-controls">
                    <div className="carousel-indicators" role="tablist">
                        {mediaItems.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-indicator ${
                                    index >= activeIndex && index < activeIndex + visibleSlides ? "active" : ""
                                }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Ir para slide ${index + 1}`}
                                aria-selected={index >= activeIndex && index < activeIndex + visibleSlides}
                                role="tab"
                            />
                        ))}
                    </div>

                    <div className="carousel-progress-container">
                        <div className="carousel-progress-bar">
                            <div
                                className="carousel-progress"
                                style={{
                                    width: maxIndex > 0 ? `${(activeIndex / maxIndex) * 100}%` : '100%',
                                    animationPlayState: isPaused ? 'paused' : 'running'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {modalMedia && (
                <div className="media-modal">
                    <div className="media-modal-content">
                        <button
                            className="close-button"
                            onClick={closeMediaModal}
                            aria-label="Fechar modal"
                        >
                            &times;
                        </button>
                        {modalMedia.type === 'image' ? (
                            <img
                                src={modalMedia.src}
                                alt={modalMedia.title}
                                className="modal-image"
                            />
                        ) : (
                            <video
                                src={modalMedia.src}
                                className="modal-video"
                                controls
                                autoPlay
                                muted={false}
                            />
                        )}
                        <h3 className="modal-title">{modalMedia.title}</h3>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Lancamentos;