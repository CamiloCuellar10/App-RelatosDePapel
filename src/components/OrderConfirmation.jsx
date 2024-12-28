import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
    const location = useLocation();
    const { cartItems, totalBooks, totalPrice } = location.state;
    const currentDate = new Date().toLocaleDateString('es-CO');

    return (
        <div className="container mt-5 text-center">
            <FaCheckCircle size={100} color="green" />
            <h1 className="display-4 mt-3">Compra Realizada</h1>
            <p className="lead">La compra se ha realizado correctamente el {currentDate}.</p>
            <div className="row">
                {cartItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">Autor: {item.author}</p>
                                <p className="card-text">Cantidad: {item.quantity}</p>
                                <p className="card-text">Precio: {item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="lead">Total de libros comprados: {totalBooks}</p>
            <p className="lead">Total pagado: {totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
        </div>
    );
};

export default OrderConfirmation;