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

const books = [
    { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', price: 50000 },
    { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', price: 45000 },
    { id: 3, title: 'El Amor en los Tiempos del Cólera', author: 'Gabriel García Márquez', price: 55000 },
    { id: 4, title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafón', price: 60000 },
    { id: 5, title: '1984', author: 'George Orwell', price: 40000 }
];

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (book) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === book.id);
      if (itemExists) {
        toast.info(`Se ha agregado otra copia de "${book.title}" al carrito.`);
        return prevItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`"${book.title}" ha sido agregado al carrito.`);
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item.quantity === 1) {
        toast.warn(`"${item.title}" ha sido eliminado del carrito.`);
        return prevItems.filter(item => item.id !== id);
      } else {
        toast.info(`Se ha eliminado una copia de "${item.title}" del carrito.`);
        return prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div>
        <Header cartItems={cartItems} />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home books={books} onAddToCart={handleAddToCart} />} />
            <Route path="/book/:id" element={<BookDetail books={books} onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} onAdd={handleAddToCart} onRemove={handleRemoveFromCart} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} onClearCart={handleClearCart} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
