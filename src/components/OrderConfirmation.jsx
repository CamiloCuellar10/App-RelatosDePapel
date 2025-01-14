import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Confetti from 'react-confetti';

const OrderConfirmation = () => {
    const location = useLocation();
    const { cartItems, totalBooks, totalPrice } = location.state;
    const currentDate = new Date().toLocaleDateString('es-CO');

    return (
        <div className="container mt-5 text-center">
            <Confetti colors={['#00FF00']} />
            <br />
            <FaCheckCircle size={100} color="green" />
            <h1 className="display-4 mt-3">Compra Realizada</h1>
            <p className="lead">La compra se ha realizado correctamente el {currentDate}.</p>
            <p className="lead">Total pagado: {totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            <p className="lead">Total de libros comprados: {totalBooks}</p>
            
            <div className="row">
                {cartItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                        <img src={item.cover} className="card__img-top" alt={item.title} />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card__title">{item.title}</h5>
                            <p className="card__text">Autor: {item.author}</p>
                            <p className="card__price">Cantidad: {item.quantity}</p>
                            <p className="card__text">Precio: {item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            
        </div>
    );
};

export default OrderConfirmation;