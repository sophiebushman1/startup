import React, { useState } from 'react';
import './style.css'; // assuming you want to keep the styling in a separate CSS file

const Browse = () => {
    // State to manage the cart
    const [cart, setCart] = useState([]);

    // Sample products data (this could be dynamically fetched from an API or database)
    const products = [
        {
            id: 1,
            name: 'Bracelet',
            description: 'Bracelet description',
            price: '$20',
            img: 'https://tresorsdestbarth.com/wp-content/uploads/2022/06/double-wrap-leather-bracelet-with-turquoise-and-solid-18k-gold-beads-and-clasp-rare-turquoise-from-arizona-jewelry-from-st-barth-island-62aa47e3-400x400.jpg',
        },
        {
            id: 2,
            name: 'Earring',
            description: 'Earring description',
            price: '$30',
            img: 'https://www.yinahawaii.com/cdn/shop/products/65b956c1a5efcf8dcacabd2c_1024x1024.png?v=1707544202',
        },
        {
            id: 3,
            name: 'Necklace',
            description: 'Necklace description',
            price: '$50',
            img: 'https://i.etsystatic.com/29155269/r/il/d059fd/5926528134/il_fullxfull.5926528134_dv8m.jpg',
        },
    ];

    // Function to handle adding a product to the cart
    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <main>
            <header>
                <h1>Cocojewel</h1>
                <h2>Welcome "USER"</h2>
                <nav>
                    <a href="">Bestsellers</a>
                    <a href="">Bracelets</a>
                    <a href="">Rings</a>
                    <a href="">Necklaces</a>
                    <a href="">Earrings</a>
                    <a href="">Accessories</a>
                    <a href="cart.html">Cart & Checkout</a>
                </nav>
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <button type="button">Search</button>
                </div>
            </header>

            <section id="products">
                <h3>Browse Our Products</h3>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <img
                                src={product.img}
                                alt={product.name}
                                width="150"
                            />
                            <p>
                                {product.description} - {product.price}
                            </p>
                            <button onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <footer>
                <a href="https://github.com/sophiebushman1/startup">My Github Repo</a>
            </footer>
        </main>
    );
};

export default Browse;
