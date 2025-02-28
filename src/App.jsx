import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
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
import Notifications from './components/Notifications';

import soundNotification from './assets/Sound_Notification.mp3';

function App() {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.post('http://localhost:8762/ms-books-catalogue/books', {
          targetMethod: 'GET'
        });
        if (response.status === 200) {
          console.log(response.data);
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleAddToCart = (book) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === book.id);
      if (itemExists) {
        toast.info(`Se ha agregado otra copia de "${book.titulo}" al carrito.`);
        playSound(soundNotification);
        return prevItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`"${book.titulo}" se ha agregado al carrito.`);
        playSound(soundNotification);
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item.quantity === 1) {
        toast.warn(`"${item.titulo}" ha sido eliminado del carrito.`);
        playSound(soundNotification);
        return prevItems.filter(item => item.id !== id);
      } else {
        toast.info(`Se ha eliminado una copia de "${item.titulo}" del carrito.`);
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
            <Route path="/cart" element={<Cart cartItems={cartItems} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart}/>} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} onClearCart={handleClearCart} playSound={playSound} clearCart={handleClearCart}/>} />
            <Route path="/order-confirmation" element={<OrderConfirmation cartItems={cartItems} clearCart={handleClearCart}/>} />
            <Route path="/favorites" element={<Favorites books={books} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favoriteBooks={favoriteBooks} />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
