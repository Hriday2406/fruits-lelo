import Icon from "@mdi/react";
import {
  mdiMagnify,
  mdiWindowClose,
  mdiHeart,
  mdiCart,
  mdiHeartOutline,
} from "@mdi/js";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { Badge, ConfigProvider, Popover } from "antd";
import CartCard from "./cartCard";
import { CartContext, FavContext } from "./App";
import Popup from "./Popup";

export default function Header({ setSearchText, showFav, setShowFav }) {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { favs } = useContext(FavContext);
  const { cart } = useContext(CartContext);
  const [popup, setPopup] = useState({
    visible: false,
    type: "info",
    title: "",
    message: "",
  });

  const navClass = (path) => {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);
    return `cursor-pointer px-3 py-2 transition-all duration-500 ease-in-out ${
      isActive
        ? "text-accent drop-shadow-[0_0_50px_#AE9B84] filter brightness-125 font-bold text-shadow-[0_0_20px_rgba(174,155,132,0.8)]"
        : "text-white hover:text-accent hover:drop-shadow-[0_0_30px_#AE9B84] hover:brightness-110"
    }`;
  };

  return (
    <header className="flex justify-between px-10 py-6">
      <div className="flex items-center gap-6 select-none">
        <Link
          to={"/"}
          className="text-accent cursor-pointer text-3xl font-bold transition-all hover:drop-shadow-[0_0_10px]"
        >
          Fruits Lelo.
        </Link>
        <nav className="flex gap-3">
          <Link className={navClass("/")} to={"/"}>
            Home
          </Link>
          <Link className={navClass("/store")} to={"/store"}>
            Store
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-11">
        <form
          action=""
          className="bg-secondary flex items-center rounded-3xl p-3 select-none"
          onClick={() => {
            searchRef.current.focus();
          }}
        >
          <Icon path={mdiMagnify} size={1} color="#ae9b84" />
          <input
            type="text"
            className="bg-secondary caret-accent border-none px-3 outline-none placeholder:text-white"
            ref={searchRef}
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                navigate("/store");
              }
            }}
          />
          <Icon
            path={mdiWindowClose}
            size={0.9}
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              searchRef.current.value = "";
              setSearchText("");
            }}
          />
        </form>
        <div className="flex gap-7">
          <ConfigProvider
            theme={{
              token: {
                colorBorderBg: "#AE9B84",
              },
            }}
          >
            <Badge
              count={favs.length}
              color="#00000000"
              offset={[5, -5]}
              showZero
              className="select-none"
            >
              <Link to={"/store"}>
                <Icon
                  path={showFav ? mdiHeart : mdiHeartOutline}
                  size={1}
                  color="#ae9b84"
                  className="cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
                  onClick={() => {
                    setShowFav((prev) => !prev);
                  }}
                />
              </Link>
            </Badge>
            <Popover
              content={<CartCard onNotify={(p) => setPopup(p)} />}
              placement="bottomRight"
              arrow={false}
              color="#0f0f0f"
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
            <Popup
              visible={popup.visible}
              type={popup.type}
              title={popup.title}
              message={popup.message}
              onClose={() => setPopup((p) => ({ ...p, visible: false }))}
            />
          </ConfigProvider>
        </div>
      </div>
    </header>
  );
}
