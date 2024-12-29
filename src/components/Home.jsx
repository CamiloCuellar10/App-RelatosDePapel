import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ books, onAddToCart }) => {
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
            <br></br>
            <div className="mb-4">
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
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Autor: {book.author}</p>
                                <p className="card-text">Precio: {book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                <button className="btn btn-primary" onClick={() => onAddToCart(book)}>Agregar al carrito</button>
                                <button className="btn btn-secondary" onClick={() => handleBookClick(book.id)}>Ver detalles</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;