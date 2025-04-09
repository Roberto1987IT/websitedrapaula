import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, Trash2, Check, X } from "lucide-react";
import "../../styles/wishlist.css";
import { useWishlist } from "../../context/WishlistContext"; 
import { books } from "../../bookData"; // Import the books data
import { courses } from "../../courseData"; // Import the courses data
import { useCart } from "../../context/CartContext"; // Import cart context

// Define types for book and course using more specific approach
type Book = typeof books[0];
type Course = typeof courses[0];

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    // Toast notification states
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

    // Get the details of the books in the wishlist
    const wishlistBooks = books.filter((book) => wishlist.includes(book.id));
    
    // Get the details of the courses in the wishlist
    const wishlistCourses = courses.filter((course) => wishlist.includes(course.id));
    
    // Combine both for total count
    const totalItems = wishlistBooks.length + wishlistCourses.length;

    // Handle toast auto-hide after 3 seconds
    useEffect(() => {
        let timer: number;
        if (showToast) {
            timer = window.setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showToast]);

    // Function to show toast notification
    const displayToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    // Format price to ensure Euro symbol appears
    const formatPrice = (price: number | string): string => {
        // If price already contains € symbol, return as is
        if (typeof price === 'string' && price.includes('€')) {
            return price;
        }
        
        // If price is a number, format it with € symbol
        if (typeof price === 'number') {
            return `€${price.toFixed(2).replace('.', ',')}`;
        }
        
        // For any other case, add € symbol if missing
        return `€${price}`;
    };

    // Function to add a book to cart
    const addBookToCart = (book: Book): void => {
        addToCart(book, 'book');
        displayToast("Livro adicionado ao carrinho!", "success");
    };

    // Function to add a course to cart
    const addCourseToCart = (course: Course): void => {
        addToCart(course, 'course');
        displayToast("Curso adicionado ao carrinho!", "success");
    };

    // Function to handle item removal with toast notification
    const handleRemoveItem = (id: number, type: 'book' | 'course'): void => {
        removeFromWishlist(id);
        displayToast(`${type === 'book' ? 'Livro' : 'Curso'} removido da lista de desejos`, "info");
    };

    return (
        <div className="wishlist-page">
            {/* Toast Notification */}
            {showToast && (
                <div className={`toast-notification ${toastType}`}>
                    <div className="toast-content">
                        {toastType === 'success' && <Check size={18} className="toast-icon" />}
                        {toastType === 'error' && <X size={18} className="toast-icon" />}
                        {toastType === 'info' && <Heart size={18} className="toast-icon" />}
                        <span>{toastMessage}</span>
                    </div>
                    <button 
                        className="toast-close" 
                        onClick={() => setShowToast(false)}
                        aria-label="Fechar notificação"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <div className="wishlist-container">
                <div className="wishlist-header">
                    <h1><Heart className="wishlist-icon" /> Minha Lista de Desejos</h1>
                    <p className="wishlist-count">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</p>
                </div>

                {totalItems === 0 ? (
                    <div className="wishlist-empty">
                        <Heart className="empty-icon" />
                        <h2>Sua lista de desejos está vazia</h2>
                        <p>Adicione itens à sua lista de desejos para encontrá-los aqui mais tarde.</p>
                        <button 
                            className="browse-button"
                            onClick={() => window.location.href = "/"}
                        >
                            Explorar Produtos
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Books section */}
                        {wishlistBooks.length > 0 && (
                            <div className="wishlist-section">
                                <h2 className="section-title">Livros</h2>
                                <div className="wishlist-items">
                                    {wishlistBooks.map((book) => (
                                        <div key={`book-${book.id}`} className="wishlist-item">
                                            <div className="wishlist-item-details">
                                                <div className="wishlist-item-image">
                                                    <img
                                                        src={book.image}
                                                        alt={`Capa do livro: ${book.title}`}
                                                    />
                                                </div>
                                                <div className="wishlist-item-info">
                                                    <h3>{book.title}</h3>
                                                    <p>{formatPrice(book.price)}</p>
                                                </div>
                                            </div>
                                            <div className="wishlist-item-actions">
                                                <button onClick={() => addBookToCart(book)} className="add-to-cart-button">
                                                    <ShoppingCart size={16} /> Adicionar ao Carrinho
                                                </button>
                                                <button 
                                                    onClick={() => handleRemoveItem(book.id, 'book')} 
                                                    className="remove-button"
                                                >
                                                    <Trash2 size={16} /> Remover
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Courses section */}
                        {wishlistCourses.length > 0 && (
                            <div className="wishlist-section">
                                <h2 className="section-title">Cursos</h2>
                                <div className="wishlist-items">
                                    {wishlistCourses.map((course) => (
                                        <div key={`course-${course.id}`} className="wishlist-item">
                                            <div className="wishlist-item-details">
                                                <div className="wishlist-item-image">
                                                    <img
                                                        src={course.image}
                                                        alt={`Imagem do curso: ${course.title}`}
                                                    />
                                                </div>
                                                <div className="wishlist-item-info">
                                                    <h3>{course.title}</h3>
                                                    <p>{formatPrice(course.price)}</p>
                                                </div>
                                            </div>
                                            <div className="wishlist-item-actions">
                                                <button onClick={() => addCourseToCart(course)} className="add-to-cart-button">
                                                    <ShoppingCart size={16} /> Adicionar ao Carrinho
                                                </button>
                                                <button 
                                                    onClick={() => handleRemoveItem(course.id, 'course')} 
                                                    className="remove-button"
                                                >
                                                    <Trash2 size={16} /> Remover
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Wishlist;