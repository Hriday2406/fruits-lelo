import { Route, Routes } from "react-router";
import Header from "./Header";
import Store from "./Store";
import Home from "./Home";

function App() {
  return (
    <div className="bg-bg w-full h-full text-white font-body">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
      </Routes>

      <div className="p-5 min-h-screen">
        <h1 className="text-black p-5 bg-accent rounded-2xl text-center font-bold font-mono">
          Fruits Lelo.
        </h1>
      </div>
    </div>
  );
}

export default App;
