import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 5000);

        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h1 className="display-4">Bienvenido</h1>
            <p className="lead">Esta es la página de inicio de Relatos de Papel.</p>
            <br />
            <p className="lead">Serás redirigido a la página principal en {counter} segundos...</p>
        </div>
    );
};

export default Landing;