import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onAdd, onRemove }) => {
    const navigate = useNavigate();

    const getTotalBooks = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Carrito de Compras</h1>
            {cartItems.length === 0 && <p className="lead">El carrito está vacío.</p>}
            {cartItems.length > 0 && (
                <p className="lead">Total de libros en el carrito: {getTotalBooks()}</p>
            )}
            <div className="row">
                {cartItems.map(item => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">Autor: {item.author}</p>
                                <p className="card-text">Cantidad: {item.quantity}</p>
                                <button className="btn btn-danger me-2" onClick={() => onRemove(item.id)}>Eliminar</button>
                                <button className="btn btn-primary" onClick={() => onAdd(item)}>Agregar más</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;