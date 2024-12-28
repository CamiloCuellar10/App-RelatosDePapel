import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-primary text-white p-3 fixed-top w-100">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="display-4">App Relatos de papel</h1>
                <div>
                    <button className="btn btn-light me-2">
                        <FaShoppingCart /> Carrito
                    </button>
                    <button className="btn btn-light me-2">
                        <FaUser /> Usuario
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;