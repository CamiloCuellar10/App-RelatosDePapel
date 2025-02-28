import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetail = ({ books, onAddToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = books.find(book => book.id === parseInt(id));

    useEffect(() => {
        if (!book) {
            console.log('Libro no encontrado');
        } else {
            console.log(`Detalles del libro: ${book.title}`);
        }
    }, [book]);

    if (!book) {
        return <div>Libro no encontrado</div>;
    }

    const handleBackClick = () => {
        navigate('/home');
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">{book.title || book.titulo}</h1>
            <img src={book.cover || book.imagen} className="img-fluid mb-3" alt={book.title || book.titulo} />
            <p className="lead">Autor: {book.author || book.autor}</p>
            <p className="card__price">Precio: {book.precio ? book.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : 'N/A'}</p>
            <p>Detalles adicionales del libro...</p>
            <button className="btn btn-primary mt-3 me-2" onClick={() => onAddToCart(book)}>Agregar al carrito</button>
            <button className="btn btn-secondary mt-3" onClick={handleBackClick}>Volver a la página principal</button>
        </div>
    );
};

export default BookDetail;