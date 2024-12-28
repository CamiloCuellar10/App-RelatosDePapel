import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaBook, FaEye } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';

const Header = ({ cartItems = [] }) => {
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
                <div className="ms-auto d-flex align-items-center">
                    <button className="btn btn-light me-2" onClick={handleHomeClick}>
                        <FaHome /> Inicio
                    </button>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="position-relative">
                            <FaShoppingCart /> Carrito
                            {cartItems.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.length}
                                    <span className="visually-hidden">items in cart</span>
                                </span>
                            )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {cartItems.length === 0 ? (
                                <Dropdown.Item>El carrito está vacío</Dropdown.Item>
                            ) : (
                                cartItems.map(item => (
                                    <Dropdown.Item key={item.id}>
                                        <FaBook className="me-2" />
                                        {item.title} - {item.quantity} x {item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                    </Dropdown.Item>
                                ))
                            )}
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleCartClick}>
                                <FaEye className="me-2" />
                                Ver Carrito
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;
