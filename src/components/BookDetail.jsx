import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = ({ books, onAddToCart }) => {
    const { id } = useParams();
    const book = books.find(book => book.id === parseInt(id));

    if (!book) {
        return <div>Libro no encontrado</div>;
    }


    return (
        <div className="container mt-5">
            <h1 className="display-4">{book.title}</h1>
            <p className="lead">Autor: {book.author}</p>
            <p>Detalles adicionales del libro...</p>
            <button className="btn btn-primary mt-3" onClick={() => onAddToCart(book)}>Agregar al carrito</button>
        </div>
    );
};

export default BookDetail;