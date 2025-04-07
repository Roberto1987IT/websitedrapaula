import React, { useState, useEffect } from "react";
import { ShoppingCart, ArrowRight, X, Plus, Minus, BookOpen } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "../../styles/cart.css";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Calculate totals
    const subtotal = cart.reduce((total, item) => 
        total + (item.book.price * item.quantity), 0);
    
    const shipping = subtotal > 50 ? 0 : 3.99; // Free shipping over €50
    const total = subtotal + shipping;

    const handleQuantityChange = (bookId: number, change: number) => {
        const item = cart.find(i => i.book.id === bookId);
        if (!item) return;
        
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) {
            removeFromCart(bookId);
        } else {
            updateQuantity(bookId, newQuantity);
        }
    };

    return (
        <div className={`cart-page ${isLoaded ? 'fade-in' : ''}`}>
            <div className="cart-container">
                <div className="cart-header">
                    <div className="header-content">
                        <h1>
                            <ShoppingCart className="cart-icon" /> 
                            O teu Carrinho
                            <span className="item-count-badge">
                                {cart.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                        </h1>
                        {cart.length > 0 && (
                            <button 
                                className="clear-cart-btn"
                                onClick={clearCart}
                            >
                                <X size={16} /> Limpar Carrinho
                            </button>
                        )}
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <div className="empty-icon-container">
                            <BookOpen size={48} className="empty-icon" />
                        </div>
                        <h2>O teu carrinho está vazio</h2>
                        <p>Adiciona produtos ao teu carrinho para continuar o processo de compra.</p>
                        <Link to="/books" className="browse-button">
                            Explorar
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={item.book.id} className="cart-item">
                                    <div className="item-image-container">
                                        <img 
                                            src={item.book.image} 
                                            alt={item.book.title} 
                                            className="item-image"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="item-details">
                                        <h3 className="item-title">{item.book.title}</h3>
                                        <p className="item-author">{item.book.author}</p>
                                        <div className="item-price">€{item.book.price.toFixed(2)}</div>
                                    </div>
                                    <div className="item-quantity-controls">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item.book.id, -1)}
                                            aria-label="Diminuir quantidade"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item.book.id, 1)}
                                            aria-label="Aumentar quantidade"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="item-total">
                                        €{(item.book.price * item.quantity).toFixed(2)}
                                    </div>
                                    <button 
                                        className="item-remove"
                                        onClick={() => removeFromCart(item.book.id)}
                                        aria-label="Remover item"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3 className="summary-header">Resumo do Pedido</h3>
                            <div className="summary-row">
                                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
                                <span>€{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Portes de envio</span>
                                <span className={shipping === 0 ? "free-shipping" : ""}>
                                    {shipping === 0 ? 'Grátis' : `€${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            {shipping > 0 && subtotal < 50 && (
                                <div className="shipping-notice">
                                    Adicione mais €{(50 - subtotal).toFixed(2)} para envio grátis!
                                </div>
                            )}
                            <div className="summary-total">
                                <span>Total</span>
                                <span className="total-price">€{total.toFixed(2)}</span>
                            </div>
                            <button 
                                className="checkout-button"
                                onClick={() => console.log("Proceed to checkout")}
                            >
                                Finalizar Compra
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </>
                )}

                <Link to="/" className="continue-shopping">
                    Continuar Comprando
                </Link>
            </div>
        </div>
    );
};

export default Cart;