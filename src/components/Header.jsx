import Icon from "@mdi/react";
import { mdiMagnify, mdiWindowClose, mdiHeart, mdiCart } from "@mdi/js";
import { useRef, useState } from "react";

export default function Header() {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="py-6 px-10 flex justify-between">
      <div className="flex gap-6 items-center select-none">
        <h1 className="font-bold text-3xl text-accent cursor-pointer  ">
          Fruits Lelo.
        </h1>
        <nav className="flex gap-3">
          <p className="cursor-pointer">Home</p>
          <p className="cursor-pointer">Store</p>
        </nav>
      </div>
      <div className="flex gap-11 items-center">
        <form
          action=""
          className="bg-secondary flex items-center p-3 rounded-3xl select-none"
          onClick={() => {
            searchRef.current.focus();
          }}
        >
          <Icon path={mdiMagnify} size={1} color="#ae9b84" />
          <input
            type="text"
            className="bg-secondary px-3 outline-none border-none caret-accent placeholder:text-white"
            ref={searchRef}
            placeholder="Search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <Icon
            path={mdiWindowClose}
            size={0.9}
            className="cursor-pointer hover:scale-125 transition-all"
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
            className="cursor-pointer hover:scale-125 transition-all"
          />
          <Icon
            path={mdiCart}
            size={1}
            color="#ae9b84"
            className="cursor-pointer hover:scale-125 transition-all"
          />
        </div>
      </div>
    </header>
  );
}
