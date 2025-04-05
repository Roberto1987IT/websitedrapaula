import React, { useState, useEffect } from "react";
import { ShoppingCart, ArrowRight, X, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "../../styles/cart.css";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
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
    
    const shipping = subtotal > 0 ? 3.99 : 0;
    const total = subtotal + shipping;

    const handleQuantityChange = (bookId: number, change: number) => {
        const item = cart.find(i => i.book.id === bookId);
        if (!item) return;
        
        const newQuantity = item.quantity + change;
        updateQuantity(bookId, newQuantity);
    };

    return (
        <div className={`cart-page ${isLoaded ? 'fade-in' : ''}`}>
            <div className="cart-container">
                <div className="cart-header">
                    <h1><ShoppingCart className="cart-icon" /> O teu Carrinho</h1>
                    <p className="cart-count">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)} itens
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <ShoppingCart className="empty-icon" />
                        <h2>O teu carrinho está vazio</h2>
                        <p>Adiciona produtos ao teu carrinho para continuar o processo de compra.</p>
                        <Link to="/" className="browse-button">
                            Explorar Produtos
                        </Link>
                    </div>
                ) : (
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.book.id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.book.image} alt={item.book.title} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.book.title}</h3>
                                    <p className="item-author">{item.book.author}</p>
                                    <div className="item-price">€{item.book.price.toFixed(2)}</div>
                                </div>
                                <div className="item-quantity">
                                    <button onClick={() => handleQuantityChange(item.book.id, -1)}>
                                        <Minus size={16} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.book.id, 1)}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="item-total">
                                    €{(item.book.price * item.quantity).toFixed(2)}
                                </div>
                                <button 
                                    className="item-remove"
                                    onClick={() => removeFromCart(item.book.id)}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="cart-summary">
                        <h3 className="summary-header">Resumo do Pedido</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Portes de envio</span>
                            <span>{shipping > 0 ? `€${shipping.toFixed(2)}` : 'Grátis'}</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>€{total.toFixed(2)}</span>
                        </div>
                        <button 
                            className="checkout-button"
                            onClick={() => console.log("Proceed to checkout")}
                        >
                            Finalizar Compra
                            <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                <Link to="/" className="continue-shopping">
                    Continuar Comprando
                </Link>
            </div>
        </div>
    );
};

export default Cart;