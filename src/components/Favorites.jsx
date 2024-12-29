import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import '../Home.css';

const Favorites = ({ favoriteBooks, books, onToggleFavorite, onAddToCart }) => {
    const navigate = useNavigate();
    const favoriteBookDetails = books.filter(book => favoriteBooks.includes(book.id));

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="container mt-5">
            <h1>Favoritos</h1>
            <div className="row">
                {favoriteBookDetails.length === 0 && <p className="lead">No tienes libros favoritos.</p>}
                {favoriteBookDetails.map(book => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={book.cover} className="card__img-top" alt={book.title} />
                            <div className="card__body d-flex flex-column">
                                <h5 className="card__title">{book.title}</h5>
                                <p className="card__text">Autor: {book.author}</p>
                                <p className="card__price">Precio: {book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <button className="btn btn-primary me-2" onClick={() => onAddToCart(book)}>Agregar al carrito</button>
                                    <button className="btn btn-secondary" onClick={() => handleBookClick(book.id)}>Ver detalles</button>
                                    <FaHeart
                                        className="ms-3"
                                        size={40}
                                        color={favoriteBooks.includes(book.id) ? 'red' : 'grey'}
                                        onClick={() => onToggleFavorite(book.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;