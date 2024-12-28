import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <header className="bg-primary text-white p-3 fixed-top w-100">
            <div className="container">
                <h1 className="display-4">App Relatos de papel</h1>
            </div>
        </header>
    );
};

export default Header;