import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext"; // Import WishlistContext
import {useTranslation } from "react-i18next";
import "../../styles/pages/books.css";
import { books, Book } from "../../bookData";
import { ChevronRight, Star, Search, Download, Book as BookIcon, Heart } from "lucide-react";
import debounce from "lodash/debounce";

const Books = ({ id }: { id: string }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Use wishlist context
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("impresso");
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  const {t} = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<boolean>(true); // Replace with actual user authentication logic
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => [...new Set([...prev, index])]);
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    []
  );

  const handleDownload = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "ebook.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleWishlist = (bookId: number) => {
    if (!user) {
      // Redirect to login if the user is not logged in
      navigate("/login");
      return;
    }

    // Add or remove the book from the wishlist
    if (wishlist.includes(bookId)) {
      removeFromWishlist(bookId);
    } else {
      addToWishlist(bookId);
    }
  };

  const filteredBooks = books
    .filter((book) => {
      if (activeFilter === "all") return true;
      return book.category === activeFilter;
    })
    .filter((book) =>
      searchQuery.trim() ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );

  const filters = [
    { id: "all", label: t("all")},
    { id: "ebook", label: t("eBooks")},
    { id: "impresso", label: t("books") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    const bookItems = bookContainerRef.current?.querySelectorAll(".book-wrapper") || [];
    bookItems.forEach((item) => observer.observe(item));

    return () => bookItems.forEach((item) => observer.unobserve(item));
  }, [filteredBooks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section id={id} className="books">
        <div className="books-header">
          <div className="title-container">
            <h2 className="section-title">{t("books")} {t("and")} {t("ebooks")}</h2>
            <p className="section-subtitle">{t("books_p")}</p>
          </div>
          <div className="search-container">
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder={t("input_placeholder")}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="search-input"
                aria-label="Campo de busca por livros"
              />
            </div>
          </div>
        </div>

        <div className="filter-container">
          <div className="books-filter">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`filter-button ${activeFilter === filter.id ? "active" : ""}`}
                aria-label={`Filtrar por ${filter.label}`}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="books-container" ref={bookContainerRef}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="book-wrapper"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                aria-label={`Card do livro: ${book.title}`}
              >
                <div className="book-card">
                  <div className="image-container">
                    <img
                      src={book.image}
                      alt={`Capa do livro: ${book.title}`}
                      className={`book-image ${loadedImages.includes(book.id) ? "loaded" : ""}`}
                      onLoad={() => handleImageLoad(book.id)}
                      onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                      loading="lazy"
                    />
                    {!loadedImages.includes(book.id) && (
                      <div className="image-placeholder">
                        <div className="loader"></div>
                      </div>
                    )}
                  </div>
                  {book.discount && book.category !== "ebook" && (
                    <div className="book-discount">
                      <span>{book.discount}%</span>
                    </div>
                  )}
                  {book.category === "ebook" && (
                    <div className="book-ebook-badge">
                      <BookIcon size={14} aria-hidden="true" />
                      <span>eBook</span>
                    </div>
                  )}
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    {book.category !== "ebook" && (
                      <div className="book-price-container">
                        {book.discount && book.originalPrice && (
                          <span className="book-original-price">
                            €{book.originalPrice.toFixed(2).replace(".", ",")}
                          </span>
                        )}
                        <span className="book-price">
                          €{book.price.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`book-overlay ${hoveredBook === book.id ? "active" : ""}`}>
                    {book.category === "ebook" ? (
                      <a
                        href={book.downloadUrl}
                        className="download-button"
                        onClick={(e) => {
                          handleDownload(e, book.downloadUrl!);
                          e.stopPropagation();
                        }}
                        aria-label={`Baixar eBook: ${book.title}`}
                      >
                        <Download size={16} aria-hidden="true" />
                        <span>{t("dwnl")} eBook</span>
                      </a>
                    ) : (
                      <Link
                        to={`/book/${book.id}`}
                        className="view-details"
                        aria-label={`Ver detalhes do livro: ${book.title}`}
                      >
                        {t('more_info')} <ChevronRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  <button
                    className={`wishlist-button ${wishlist.includes(book.id) ? "active" : ""}`}
                    onClick={() => toggleWishlist(book.id)}
                    aria-label={`Adicionar ou remover ${book.title} da lista de desejos`}
                  >
                    <Heart
                      size={20}
                      fill={wishlist.includes(book.id) ? "red" : "none"}
                      color={wishlist.includes(book.id) ? "red" : "black"}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>{t("no_books_find")}</p>
              <button
                className="reset-button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("impresso");
                }}
                aria-label="Limpar filtros de busca"
              >
                {t("clr_flt")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Books;