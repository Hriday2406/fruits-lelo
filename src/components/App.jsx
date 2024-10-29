import { Route, Routes } from "react-router";
import Header from "./Header";
import Store from "./Store";
import Home from "./Home";
import Product from "./Product";

function App() {
  return (
    <div className="w-full text-white bg-bg font-body">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:slug" element={<Product />} />
      </Routes>

      {/* <div className="min-h-screen p-5">
        <h1 className="p-5 font-mono font-bold text-center text-black bg-accent rounded-2xl">
          Fruits Lelo.
        </h1>
      </div> */}
    </div>
  );
}

export default App;
