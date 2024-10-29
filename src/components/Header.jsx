import Icon from "@mdi/react";
import { mdiMagnify, mdiWindowClose, mdiHeart, mdiCart } from "@mdi/js";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  return (
    <header className="flex justify-between px-10 py-6">
      <div className="flex items-center gap-6 select-none">
        <h1
          className="text-3xl font-bold cursor-pointer text-accent "
          onClick={() => {
            navigate("/");
          }}
        >
          Fruits Lelo.
        </h1>
        <nav className="flex gap-3">
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate("/store");
            }}
          >
            Store
          </p>
        </nav>
      </div>
      <div className="flex items-center gap-11">
        <form
          action=""
          className="flex items-center p-3 select-none bg-secondary rounded-3xl"
          onClick={() => {
            searchRef.current.focus();
          }}
        >
          <Icon path={mdiMagnify} size={1} color="#ae9b84" />
          <input
            type="text"
            className="px-3 border-none outline-none bg-secondary caret-accent placeholder:text-white"
            ref={searchRef}
            placeholder="Search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <Icon
            path={mdiWindowClose}
            size={0.9}
            className="transition-all cursor-pointer hover:scale-125"
            onClick={() => {
              searchRef.current.value = "";
              setSearchValue("");
            }}
          />
        </form>
        <div className="flex gap-7">
          <Icon
            path={mdiHeart}
            size={1}
            color="#ae9b84"
            className="transition-all cursor-pointer hover:scale-125"
          />
          <Icon
            path={mdiCart}
            size={1}
            color="#ae9b84"
            className="transition-all cursor-pointer hover:scale-125"
          />
        </div>
      </div>
    </header>
  );
}
