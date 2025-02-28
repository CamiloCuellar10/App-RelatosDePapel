import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import soundPay from '../assets/Sound_Pay.mp3';
import soundNotification from '../assets/Sound_Notification.mp3';


const Checkout = ({ cartItems, playSound, clearCart}) => {
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.precio || 0) * item.quantity, 0);
    };

    const getTotalBooks = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handlePayment = async () => {
        if (cartItems.length === 0) {
            toast.error('El carrito está vacío.');
            return;
        }

        const bookIds = cartItems.flatMap(item => Array(item.quantity).fill(item.id.toString()));

        try {
            const response = await axios.post('http://localhost:8762/ms-books-payments/payments', {
                targetMethod: 'POST',
                body: { books: bookIds }
            });

            if (response.status === 200) {
                toast.success('Pago realizado exitosamente.');
                playSound(soundPay);

                const totalBooks = getTotalBooks();
                const totalPrice = getTotalPrice();

                // Vacía el carrito al confirmar el pago
                clearCart();

                // Navega a la confirmación solo si el pago fue exitoso
                navigate('/order-confirmation', { state: { cartItems, totalBooks, totalPrice } });
            } else {
                playSound(soundNotification);
                const errorMessage = response.data?.message || 'Error al procesar el pago. Por favor, intenta nuevamente.';
                toast.error(errorMessage);
            }
        } catch (error) {
            playSound(soundNotification);
            const errorMessage = error.response?.data?.message || 'Error al procesar el pago. Por favor, intenta nuevamente.';
            console.error('Error al procesar el pago:', error);
            toast.error(errorMessage);
        }
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
                                    <img src={item.cover || item.imagen} className="card__img-top" alt={item.title || item.titulo} />
                                    <div className="card__body d-flex flex-column">
                                        <h5 className="card__title">{item.title || item.titulo}</h5>
                                        <p className="card__text">Autor: {item.author || item.autor}</p>
                                        <p className="card__text">Cantidad: {item.quantity}</p>
                                        <p className="card__price">Precio: {(item.precio || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="lead">Total a pagar: {getTotalPrice().toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                    <button className="btn btn-success mt-3" onClick={handlePayment}>Proceder al Pago</button>
                </>
            )}
            <br />
            <br />
            <br />
        </div>
    );
};

export default Checkout;
