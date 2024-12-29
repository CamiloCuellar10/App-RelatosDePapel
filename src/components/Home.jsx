import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import '../Home.css'; // Asegúrate de crear este archivo CSS para estilos personalizados

const Home = ({ books, onAddToCart, favoriteBooks, onToggleFavorite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Bienvenido a la página principal');
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <br/>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por título de libro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="row">
                {filteredBooks.map(book => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={book.cover} className="card-img-top" alt={book.title} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Autor: {book.author}</p>
                                <p className="card-text">Precio: {book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
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

export default Home;