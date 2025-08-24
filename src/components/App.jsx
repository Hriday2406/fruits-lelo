import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import Header from "./Header";
import Store from "./Store";
import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import NotFound from "./NotFound";
import {
  getCart as loadCart,
  setCart as saveCart,
  getFavs as loadFavs,
  setFavs as saveFavs,
  loadJSON,
} from "../utils/storage";

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
  let initialCart = [
    {
      fruitId: 1,
      count: 2,
    },
    {
      fruitId: 4,
      count: 3,
    },
  ];
  let initialFavs = [0, 2, 4, 7];

  // Initialize storage with defaults if missing
  if (loadJSON("cart", null) == null) saveCart(initialCart);
  if (loadJSON("favs", null) == null) saveFavs(initialFavs);

  const [cart, setCart] = useState(loadCart());
  const [favs, setFavs] = useState(loadFavs());
  const [searchText, setSearchText] = useState("");
  const [showFav, setShowFav] = useState(false);

  useEffect(() => {
    const handler = () => setSearchText("");
    window.addEventListener("clearSearch", handler);
    return () => window.removeEventListener("clearSearch", handler);
  }, []);

  // Persist cart/favs to storage when they change
  useEffect(() => {
    try {
      saveCart(cart);
    } catch {
      // saveCart already handles failures; keep silent here
    }
  }, [cart]);

  useEffect(() => {
    try {
      saveFavs(favs);
    } catch {
      // noop
    }
  }, [favs]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <FavContext.Provider value={{ favs, setFavs }}>
        <div className="bg-bg font-body scrollbar-thin scrollbar-webkit min-h-screen w-full pt-20 text-white md:pt-24">
          <Header
            setSearchText={setSearchText}
            showFav={showFav}
            setShowFav={setShowFav}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/store"
              element={
                <Store
                  searchText={searchText}
                  setSearchText={setSearchText}
                  showFav={showFav}
                />
              }
            />
            <Route path="/store/:slug" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </FavContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
