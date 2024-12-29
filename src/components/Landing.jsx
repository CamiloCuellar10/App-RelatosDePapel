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
            <div className="text-center p-5 rounded shadow">
                <h1 className="display-4 mb-4">Bienvenido</h1>
                <p className="lead mb-4">Esta es la página de inicio de Relatos de Papel.</p>
                <p className="lead">Redirigiendo a la página principal en </p>
                <span className="display-2 text-danger">{counter}</span>
                <p className="lead">Segundos</p>
            </div>
        </div>
    );

    
};

export default Landing;