import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Favorites = ({ favoriteBooks, books, onToggleFavorite }) => {
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
                        <div className="card">
                            <img src={book.cover} className="card-img-top" alt={book.title} />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Autor: {book.author}</p>
                                <p className="card-text">Precio: {book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                <FaHeart
                                    className="ms-3"
                                    color="red"
                                    onClick={() => onToggleFavorite(book.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <button className="btn btn-secondary" onClick={() => handleBookClick(book.id)}>Ver detalles</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;