// FILE: src/hooks/useNotifications.js
import { useState } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Tu pedido ha sido enviado.', type: 'success' },
    { id: 2, message: 'Tu libro favorito está en oferta.', type: 'info' },
    { id: 3, message: 'Nuevo libro añadido a la colección.', type: 'info' },
    { id: 4, message: 'Error al procesar el pago.', type: 'error' }
  ]);

  const addNotification = (message, type) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      type
    };
    setNotifications([...notifications, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification
  };
};

export default useNotifications;