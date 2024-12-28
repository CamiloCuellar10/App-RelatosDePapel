import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 fixed-bottom w-100">
            <div className="container">
                <p>&copy; 2024 Relatos De Papel.</p>
                <p>&copy; Creado por Christian Camilo Cuellar Pira - UNIR</p>
            </div>
        </footer>
    );
};

export default Footer;