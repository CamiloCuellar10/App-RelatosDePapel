import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onAddToCart, onRemoveFromCart }) => {
    const navigate = useNavigate();

    const getTotalBooks = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.precio || 0) * item.quantity, 0);
    };

    const handleBackClick = () => {
        navigate('/home');
    };

    const handleCheckoutClick = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Carrito de Compras</h1>
            {cartItems.length === 0 && <p className="lead">El carrito está vacío.</p>}
            {cartItems.length > 0 && (
                <>
                    <p className="lead">Total de libros en el carrito: {getTotalBooks()}</p>
                    <p className="lead">Total a pagar: {getTotalPrice().toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </>
            )}
            {cartItems.length > 0 && (
                <button className="btn btn-success mt-3 ms-3" onClick={handleCheckoutClick}>Proceder al Pago</button>
            )}
            <br/>    <br/>  
            <div className="row">
                {cartItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={item.cover || item.imagen} className="card__img-top" alt={item.title || item.titulo} />
                            <div className="card__body d-flex flex-column">
                                <h5 className="card__title">{item.title || item.titulo}</h5>
                                <p className="card__text">Autor: {item.author || item.autor}</p>
                                <p className="card__text">Cantidad: {item.quantity}</p>
                                <p className="card__price">Precio: {item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-secondary me-2" onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
                                    <button className="btn btn-primary me-2" onClick={() => onAddToCart(item)}>Agregar</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                ))}
            </div>
            <button className="btn btn-secondary mt-3" onClick={handleBackClick}>Volver a la página principal</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
};

export default Cart;