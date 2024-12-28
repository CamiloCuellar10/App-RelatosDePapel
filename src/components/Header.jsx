import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome } from 'react-icons/fa';

const Header = ({ cartItemCount }) => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleHomeClick = () => {
        navigate('/home');
    };

    return (
        <header className="bg-primary text-white p-1 fixed-top w-100">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="display-4">App Relatos de papel</h1>
                <div>
                    <button className="btn btn-light me-2" onClick={handleHomeClick}>
                        <FaHome /> Inicio
                    </button>
                    <button className="btn btn-light position-relative me-2" onClick={handleCartClick}>
                        <FaShoppingCart /> Carrito
                        {cartItemCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartItemCount}
                                <span className="visually-hidden">items in cart</span>
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;