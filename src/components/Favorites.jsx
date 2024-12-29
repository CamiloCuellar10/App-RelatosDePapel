import React from 'react';
import { useNavigate } from 'react-router-dom';

const Favorites = ({ books, favoriteBooks }) => {
    const navigate = useNavigate();
    const favoriteItems = books.filter(book => favoriteBooks.includes(book.id));

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Libros Favoritos</h1>
            <div className="row">
                {favoriteItems.length === 0 && <p className="lead">No tienes libros favoritos.</p>}
                {favoriteItems.map(book => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Autor: {book.author}</p>
                                <p className="card-text">Precio: {book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
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