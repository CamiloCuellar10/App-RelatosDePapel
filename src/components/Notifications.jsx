import React from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';
import useNotifications from '../hooks/useNotifications';

const Notifications = () => {
    const { notifications } = useNotifications();

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <FaCheckCircle color="green" />;
            case 'info':
                return <FaInfoCircle color="blue" />;
            case 'error':
                return <FaExclamationCircle color="red" />;
            default:
                return <FaInfoCircle />;
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Notificaciones</h1>
            <ul className="list-group">
                {notifications.map(notification => (
                    <li key={notification.id} className="list-group-item d-flex align-items-center">
                        <span className="me-3">{getIcon(notification.type)}</span>
                        <span>{notification.message}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;