import React from "react";
import {Heart, ShoppingCart, Trash2} from "lucide-react";
import "../../styles/wishlist.css";
import {useWishlist} from "../../context/WishlistContext"; // Import WishlistContext
import {useTranslation} from "react-i18next";
import {books} from "../../bookData"; // Import the books data

const Wishlist = () => {
    const {t} = useTranslation();
    const {wishlist, removeFromWishlist} = useWishlist(); // Use the global wishlist state
    // Get the details of the books in the wishlist
    const wishlistBooks = books.filter((book) => wishlist.includes(book.id));
    // Placeholder function for adding to cart
    const addToCart = (id: number) => {
        console.log(`Item ${id} added to cart`);
        // Here you would integrate with your cart functionality
    };

    return (
        <div className="wishlist-page fade-in">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <h1><Heart className="wishlist-icon"/> {t("favorits.title")} </h1>
                    <p className="wishlist-count">
                        {wishlistBooks.length}{" "}

                        {wishlistBooks.length === "1" ? t("favorits.item") : t("favorits.item_plural")}
                    </p>


                </div>

                {wishlistBooks.length === 0 ? (
                    <div className="wishlist-empty">
                        <Heart className="empty-icon"/>
                        <h2>
                            {t("favorits.empty_list")}
                        </h2>
                        <p>
                            {t("favorits.p")}
                        </p>
                        <button
                            className="browse-button"
                            onClick={() => window.location.href = "/"}
                        >
                            {t("favorits.button")}
                        </button>
                    </div>
                ) : (
                    <div className="wishlist-items">
                        {wishlistBooks.map((book) => (
                            <div key={book.id} className="wishlist-item">
                                <div className="wishlist-item-details">
                                    <img
                                        src={book.image}
                                        alt={`Capa do livro: ${book.title}`}
                                        className="wishlist-item-image"
                                    />
                                    <div className="wishlist-item-info">
                                        <h3>{book.title}</h3>
                                        <p>€{book.price.toFixed(2).replace(".", ",")}</p>
                                    </div>
                                </div>
                                <div className="wishlist-item-actions">
                                    <button onClick={() => addToCart(book.id)} className="add-to-cart-button">
                                        <ShoppingCart/> Adicionar ao Carrinho
                                    </button>
                                    <button onClick={() => removeFromWishlist(book.id)} className="remove-button">
                                        <Trash2/> Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;