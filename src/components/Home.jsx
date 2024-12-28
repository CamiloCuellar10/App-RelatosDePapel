import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ books, onAddToCart }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Pagina Principal</h1>
            <p className="lead">Esta es la página de inicio de Relatos de Papel.</p>
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