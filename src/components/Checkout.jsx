import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import soundPay from '../assets/Sound_Pay.mp3';

const Checkout = ({ cartItems, onClearCart, playSound }) => {
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getTotalBooks = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handlePayment = () => {
        toast.success('El pedido se ha realizado con éxito.');
        playSound(soundPay);
        const totalBooks = getTotalBooks();
        const totalPrice = getTotalPrice();
        onClearCart();
        navigate('/order-confirmation', { state: { cartItems, totalBooks, totalPrice } });
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Resumen de Compra</h1>
            {cartItems.length === 0 && <p className="lead">El carrito está vacío.</p>}
            {cartItems.length > 0 && (
                <>
                    <div className="row">
                        {cartItems.map(item => (
                            <div key={item.id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img src={item.cover} className="card-img-top" alt={item.title} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">Autor: {item.author}</p>
                                        <p className="card-text">Cantidad: {item.quantity}</p>
                                        <p className="card-text">Precio: {item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="lead">Total a pagar: {getTotalPrice().toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                    <button className="btn btn-success mt-3" onClick={handlePayment}>Proceder al Pago</button>
                </>
            )}
        </div>
    );
};

export default Checkout;