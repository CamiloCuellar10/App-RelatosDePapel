import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Landing from './components/Landing';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Favorites from './components/Favorites';

import soundNotification from './assets/Sound_Notification.mp3';

const books = [
    { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', price: 50000 },
    { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', price: 45000 },
    { id: 3, title: 'El Amor en los Tiempos del Cólera', author: 'Gabriel García Márquez', price: 55000 },
    { id: 4, title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafón', price: 60000 },
    { id: 5, title: '1984', author: 'George Orwell', price: 40000 },
    { id: 6, title: 'Matar a un Ruiseñor', author: 'Harper Lee', price: 45000 },
    { id: 7, title: 'Orgullo y Prejuicio', author: 'Jane Austen', price: 50000 },
    { id: 8, title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', price: 55000 },
    { id: 9, title: 'Crimen y Castigo', author: 'Fiódor Dostoyevski', price: 60000 },
    { id: 10, title: 'En Busca del Tiempo Perdido', author: 'Marcel Proust', price: 70000 },
    { id: 11, title: 'Ulises', author: 'James Joyce', price: 65000 },
    { id: 12, title: 'La Odisea', author: 'Homero', price: 40000 }
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleAddToCart = (book) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === book.id);
      if (itemExists) {
        toast.info(`Se ha agregado otra copia de "${book.title}" al carrito.`);
        playSound(soundNotification);
        return prevItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`"${book.title}" ha sido agregado al carrito.`);
        playSound(soundNotification);
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item.quantity === 1) {
        toast.warn(`"${item.title}" ha sido eliminado del carrito.`);
        playSound(soundNotification);
        return prevItems.filter(item => item.id !== id);
      } else {
        toast.info(`Se ha eliminado una copia de "${item.title}" del carrito.`);
        playSound(soundNotification);
        return prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleFavorite = (id) => {
    setFavoriteBooks(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div>
        <Header cartItems={cartItems} />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home books={books} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favoriteBooks={favoriteBooks} />} />
            <Route path="/book/:id" element={<BookDetail books={books} onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} onAdd={handleAddToCart} onRemove={handleRemoveFromCart} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} onClearCart={handleClearCart} playSound={playSound} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/favorites" element={<Favorites books={books} favoriteBooks={favoriteBooks} />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
