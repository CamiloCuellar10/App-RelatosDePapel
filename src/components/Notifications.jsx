import React from 'react';

const Notifications = () => {
    const notifications = [
        { id: 1, message: 'Tu pedido ha sido enviado.' },
        { id: 2, message: 'Tu libro favorito está en oferta.' },
        { id: 3, message: 'Nuevo libro añadido a la colección.' }
    ];

    return (
        <div className="container mt-5">
            <h1 className="display-4">Notificaciones</h1>
            <ul className="list-group">
                {notifications.map(notification => (
                    <li key={notification.id} className="list-group-item">
                        {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;