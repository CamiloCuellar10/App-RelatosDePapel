import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Libro_CienAniosDeSoledad from '/src/assets/bookCovers/Libro_CienAniosDeSoledad.jpg';
import Libro_DonQuijote from '/src/assets/bookCovers/Libro_DonQuijote.jpg';
import Libro_LaOdisea from '/src/assets/bookCovers/Libro_LaOdisea.jpg';
import Libro_LaHojarasca from '/src/assets/bookCovers/Libro_LaHojarasca.jpg';
import Libro_Delirio from '/src/assets/bookCovers/Libro_Delirio.jpg';
import Libro_ElOlvidoQueSeremos from '/src/assets/bookCovers/Libro_ElOlvidoQueSeremos.jpg';
import Libro_LaCasaDeLaBelleza from '/src/assets/bookCovers/Libro_LaCasaDeLaBelleza.jpg';
import Libro_Satanas from '/src/assets/bookCovers/Libro_Satanas.jpg';
import Libro_RosarioTijeras from '/src/assets/bookCovers/Libro_RosarioTijeras.jpg';
import Libro_QueVivaLaMusica from '/src/assets/bookCovers/Libro_QueVivaLaMusica.jpg';
import Libro_Ulises from '/src/assets/bookCovers/Libro_Ulises.jpg';
import Libro_ElAmorEnTiemposDeColera from '/src/assets/bookCovers/Libro_ElAmorEnTiemposDeColera.jpg';

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

const books = [
  { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', price: 50000, cover: Libro_CienAniosDeSoledad },
  { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', price: 60000, cover: Libro_DonQuijote },
  { id: 3, title: 'La Odisea', author: 'Homero', price: 42000, cover: Libro_LaOdisea },
  { id: 4, title: 'La hojarasca', author: 'Gabriel García Márquez', price: 40000, cover: Libro_LaHojarasca },
  { id: 5, title: 'Delirio', author: 'Laura Restrepo', price: 45000, cover: Libro_Delirio },
  { id: 6, title: 'El olvido que seremos', author: 'Héctor Abad Faciolince', price: 47000, cover: Libro_ElOlvidoQueSeremos },
  { id: 7, title: 'La casa de la belleza', author: 'Melba Escobar', price: 43000, cover: Libro_LaCasaDeLaBelleza },
  { id: 8, title: 'Satanás', author: 'Mario Mendoza', price: 49000, cover: Libro_Satanas },
  { id: 9, title: 'Rosario Tijeras', author: 'Jorge Franco', price: 46000, cover: Libro_RosarioTijeras },
  { id: 10, title: 'Que viva la música', author: 'Andrés Caicedo', price: 70000, cover: Libro_QueVivaLaMusica },
  { id: 11, title: 'Ulises', author: 'James Joyce', price: 65000, cover: Libro_Ulises },
  { id: 12, title: 'El Amor en los Tiempos del Cólera', author: 'Gabriel García Márquez', price: 55000, cover: Libro_ElAmorEnTiemposDeColera }
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
            <Route path="/cart" element={<Cart cartItems={cartItems} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart}/>} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} onClearCart={handleClearCart} playSound={playSound} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation cartItems={cartItems} />} />
            <Route path="/favorites" element={<Favorites books={books} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favoriteBooks={favoriteBooks} />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
        <ToastContainer />
        <Footer />
      </div>
      <br /><br /><br /><br />
    </Router>
  );
}

export default App;
