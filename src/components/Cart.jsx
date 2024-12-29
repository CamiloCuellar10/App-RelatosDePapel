import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const navigate = useNavigate();

    const getTotalBooks = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
            <div className="row">
                {cartItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={item.cover} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">Autor: {item.author}</p>
                                <p className="card-text">Cantidad: {item.quantity}</p>
                                <p className="card-text">Precio: {item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                <button className="btn btn-danger me-2" onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-secondary mt-3" onClick={handleBackClick}>Volver a la página principal</button>
            {cartItems.length > 0 && (
                <button className="btn btn-success mt-3 ms-3" onClick={handleCheckoutClick}>Proceder al Pago</button>
            )}
        </div>
    );
};

export default Cart;