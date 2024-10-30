import Icon from "@mdi/react";
import { mdiMagnify, mdiWindowClose, mdiHeart, mdiCart } from "@mdi/js";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Badge, ConfigProvider, Popover } from "antd";
import CartCard from "./cartCard";
import { CartContext, FavContext } from "./App";

export default function Header() {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { favs } = useContext(FavContext);
  const { cart } = useContext(CartContext);

  return (
    <header className="flex justify-between px-10 py-6">
      <div className="flex select-none items-center gap-6">
        <Link
          to={"/"}
          className="cursor-pointer text-3xl font-bold text-accent transition-all hover:drop-shadow-[0_0_10px]"
        >
          Fruits Lelo.
        </Link>
        <nav className="flex gap-3">
          <Link
            className="cursor-pointer border-b-2 border-bg px-1 transition-all hover:border-b-2 hover:border-accent hover:drop-shadow-[0_0_20px_#AE9B84]"
            to={"/"}
          >
            Home
          </Link>
          <Link
            className="cursor-pointer border-b-2 border-bg px-1 transition-all hover:border-b-2 hover:border-accent hover:drop-shadow-[0_0_20px_#AE9B84]"
            to={"/store"}
          >
            Store
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-11">
        <form
          action=""
          className="flex select-none items-center rounded-3xl bg-secondary p-3"
          onClick={() => {
            searchRef.current.focus();
          }}
        >
          <Icon path={mdiMagnify} size={1} color="#ae9b84" />
          <input
            type="text"
            className="border-none bg-secondary px-3 caret-accent outline-none placeholder:text-white"
            ref={searchRef}
            placeholder="Search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <Icon
            path={mdiWindowClose}
            size={0.9}
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              searchRef.current.value = "";
              setSearchValue("");
            }}
          />
        </form>
        <div className="flex gap-7">
          <ConfigProvider
            theme={{
              token: {
                colorBgElevated: "#0f0f0f",
                colorBorderBg: "#AE9B84",
              },
            }}
          >
            <Badge
              count={favs.length}
              color="black"
              offset={[5, -5]}
              showZero
              className="select-none"
            >
              <Icon
                path={mdiHeart}
                size={1}
                color="#ae9b84"
                className="cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
              />
            </Badge>
            <Popover
              content={<CartCard />}
              placement="bottomRight"
              arrow={false}
            >
              <Badge
                count={cart.length}
                color="#00000000"
                offset={[5, -5]}
                showZero
                className="select-none"
              >
                <Icon
                  path={mdiCart}
                  size={1}
                  color="#ae9b84"
                  className="cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
                  onClick={() => {
                    navigate("/cart");
                  }}
                />
              </Badge>
            </Popover>
          </ConfigProvider>
        </div>
      </div>
    </header>
  );
}
