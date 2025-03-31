import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { books } from '../../bookData';
import '../../styles/pages/bookDetails.css';
import { Star, ChevronLeft, ShoppingCart, Heart, AlertCircle, BookOpen } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const book = books.find((book: { id: number }) => book.id === Number(id)) as {
    tags: string[];
    [key: string]: any;
  } | undefined;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showNotification = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    showNotification('Added to cart successfully!');
  };

  const handleBuyNow = () => {
    showNotification('Proceeding to checkout...');
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showNotification(isWishlisted ? 'Removed from wishlist!' : 'Added to wishlist!');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!book) {
    return (
      <div className="book-details-container book-not-found">
        <div className="not-found-content">
          <AlertCircle size={48} className="not-found-icon" />
          <h1 className="text-2xl font-bold mb-2">Book not found</h1>
          <p className="text-muted-foreground mb-4">Sorry, we couldn't find the book you're looking for.</p>
          <Link to="/" className="back-button inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground">
            <ChevronLeft size={16} />
            Voltar ao Livros
          </Link>
        </div>
      </div>
    );
  }

  // Determine availability status text and color
  const getAvailabilityInfo = (status: string) => {
    switch (status) {
      case 'in-stock':
        return { text: 'In Stock', color: 'text-green-600' };
      case 'limited':
        return { text: 'Limited Stock', color: 'text-amber-600' };
      case 'pre-order':
        return { text: 'Pre-order', color: 'text-blue-600' };
      case 'out-of-stock':
        return { text: 'Out of Stock', color: 'text-red-600' };
      default:
        return { text: 'Unknown', color: 'text-gray-600' };
    }
  };
  
  const availability = getAvailabilityInfo(book.availability);

  return (
    <div className="book-details-container">
      <div className="book-details-header">
        <Link to="/#livros" className="back-button">
          <ChevronLeft size={16} />
          <span>Voltar</span>
        </Link>
        <h1 className="book-title">{book.title}</h1>
      </div>
      
      <div className="book-details-content">
        <div className="book-details-image-container">
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <div className={`image-loading-placeholder ${imageLoaded ? 'hidden' : 'visible'}`}></div>
            <img 
              src={book.image} 
              alt={book.title} 
              className={`book-details-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {book.featured && <div className="featured-badge">Featured</div>}
          {book.discount && <div className="discount-badge">{book.discount}% OFF</div>}
          <button 
            className={`wishlist-button ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>
        
        <div className="book-details-info">
          <div className="book-details-main">
            <div className="badge-container">
              <div className="book-category-badge">
                <BookOpen size={14} />
                <span>{book.category === 'ebook' ? 'eBook' : book.category.charAt(0).toUpperCase() + book.category.slice(1)}</span>
              </div>
              
              {book.newRelease && (
                <div className="new-release-badge">
                  New Release
                </div>
              )}
              
              {book.bestSeller && (
                <div className="bestseller-badge">
                  Bestseller
                </div>
              )}
            </div>
            
            <div className="book-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(book.rating) ? "star filled" : i < book.rating ? "star half-filled" : "star"}
                    fill={i < Math.floor(book.rating) ? "currentColor" : i < book.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="rating-count">{book.reviews} reviews</span>
            </div>
            
            <div className="book-details-price">
              <div className="price-current">€{book.price.toFixed(2)}</div>
              {book.originalPrice && (
                <div className="price-original">€{book.originalPrice.toFixed(2)}</div>
              )}
              {book.discount && (
                
                <div className="discount-text">
                  Poupa {book.discount}%
                </div>
              )}
            </div>
            
            <div className="book-description-container">
              <h2 className="section-title">Sobre o Livro</h2>
              <p className="book-description">{book.description}</p>
            </div>
            
            <div className="book-details-meta">
              <div className="meta-item">
                <span className="meta-label">Autor</span>
                <span className="meta-value">{book.author}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Publicado</span>
                <span className="meta-value">{formatDate(book.publicationDate)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Linguagem</span>
                <span className="meta-value">{book.language}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Editora</span>
                <span className="meta-value">{book.publisher}</span>
              </div>
              {book.pages && (
                <div className="meta-item">
                  <span className="meta-label">Paginas</span>
                  <span className="meta-value">{book.pages}</span>
                </div>
              )}
              {book.format && (
                <div className="meta-item">
                  <span className="meta-label">Format</span>
                  <span className="meta-value">{book.format}</span>
                </div>
              )}
              {book.fileSize && (
                <div className="meta-item">
                  <span className="meta-label">File Size</span>
                  <span className="meta-value">{book.fileSize}</span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">Disponivel</span>
                <span className={`meta-value availability-${book.availability}`}>
                  {availability.text}
                </span>
              </div>
            </div>
            
            <div className="book-actions">
              <button 
                className={`cart-button ${isAddedToCart ? 'added' : ''}`} 
                onClick={handleAddToCart}
                disabled={isAddedToCart || book.availability === 'out-of-stock'}
              >
                <ShoppingCart size={18} />
                <span>{isAddedToCart ? 'Added to Cart' : 'Adicionar ao Carrinho'}</span>
              </button>
              <button 
                className="buy-button"
                onClick={handleBuyNow}
                disabled={book.availability === 'out-of-stock'}
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showPopup && (
        <div className="notification-popup">
          <div className="notification-content">
            {popupMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;