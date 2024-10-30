import { createContext, useState } from "react";
import { Route, Routes } from "react-router";
import Header from "./Header";
import Store from "./Store";
import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import { FRUITS } from "../utils/constants";

export const FruitsContext = createContext(FRUITS);
export const CartContext = createContext([
  {
    fruitId: 1,
    count: 2,
  },
  {
    fruitId: 4,
    count: 3,
  },
]);
export const FavContext = createContext([0, 2, 4, 7]);

function App() {
  const initialCart = [
    {
      fruitId: 1,
      count: 2,
    },
    {
      fruitId: 4,
      count: 3,
    },
  ];

  const [fruits, setFruits] = useState(FRUITS);
  const [cart, setCart] = useState(initialCart);
  const [favs, setFavs] = useState([0, 2, 4, 7]);

  return (
    <FruitsContext.Provider value={{ fruits, setFruits }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <FavContext.Provider value={{ favs, setFavs }}>
          <div className="w-full bg-bg font-body text-white">
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/:slug" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </FavContext.Provider>
      </CartContext.Provider>
    </FruitsContext.Provider>
  );
}

export default App;
