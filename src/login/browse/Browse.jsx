// src/browse/Browse.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './browse.css'; // Add any custom CSS for this component

export function Browse() {
    const userName = localStorage.getItem('userName'); // Get userName from localStorage
    const navigate = useNavigate();

    return (
        <div>
            {/* Header */}
            <header>
                <h1>Cocojewel</h1>
                <h2>Welcome {userName ? userName : 'Guest'}</h2>
                <nav>
                    <a href="#">Share Cart</a>
                    <a href="#">Logout</a>
                    
                    <a href="#">Checkout</a>
                </nav>
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <button type="button">Search</button>
                </div>
            </header>

            {/* Product Listing */}
            <section id="products">
                <h3>Browse Our Products</h3>
                <div className="product-grid">
                    <div className="product-item">
                        <img 
                            src="https://tresorsdestbarth.com/wp-content/uploads/2022/06/double-wrap-leather-bracelet-with-turquoise-and-solid-18k-gold-beads-and-clasp-rare-turquoise-from-arizona-jewelry-from-st-barth-island-62aa47e3-400x400.jpg" 
                            alt="Bracelet" 
                            width="150" 
                        />
                        <p>Bracelet description - $15</p>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-item">
                        <img 
                            src="https://www.yinahawaii.com/cdn/shop/products/65b956c1a5efcf8dcacabd2c_1024x1024.png?v=1707544202" 
                            alt="Ring" 
                            width="150" 
                        />
                        <p>Ring description - $25</p>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-item">
                        <img 
                            src="https://i.etsystatic.com/29155269/r/il/d059fd/5926528134/il_fullxfull.5926528134_dv8m.jpg" 
                            alt="Necklace" 
                            width="150" 
                        />
                        <p>Necklace description - $20</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <a href="https://github.com/sophiebushman1/startup" target="_blank" rel="noopener noreferrer">
                    My Github Repo
                </a>
                <p>Created by Sophia Bushman</p>
            </footer>
        </div>
    );
}
