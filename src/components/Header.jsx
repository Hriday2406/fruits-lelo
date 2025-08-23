import Icon from "@mdi/react";
import {
  mdiMagnify,
  mdiWindowClose,
  mdiHeart,
  mdiCart,
  mdiHeartOutline,
  mdiMenu,
  mdiClose,
} from "@mdi/js";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Badge, ConfigProvider, Popover } from "antd";
import CartCard from "./cartCard";
import { CartContext, FavContext } from "./App";

export default function Header({ setSearchText, showFav, setShowFav }) {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { favs } = useContext(FavContext);
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="px-4 py-4 sm:px-10 sm:py-6">
      {/* Mobile Header */}
      <div className="flex items-center justify-between lg:hidden">
        <Link
          to={"/"}
          className="cursor-pointer text-2xl font-bold text-accent transition-all hover:drop-shadow-[0_0_10px] sm:text-3xl"
        >
          Fruits Lelo.
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Mobile Cart and Favorites */}
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
          </ConfigProvider>
          
          {/* Hamburger Menu Button */}
          <button
            className="p-2 transition-all hover:scale-125"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon
              path={isMenuOpen ? mdiClose : mdiMenu}
              size={1}
              color="#ae9b84"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="mt-4 space-y-4 border-t border-secondary pt-4">
            {/* Mobile Search */}
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
                className="flex-1 border-none bg-secondary px-3 caret-accent outline-none placeholder:text-white"
                ref={searchRef}
                placeholder="Search"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    navigate("/store");
                    setIsMenuOpen(false);
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
            
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              <Link
                className="cursor-pointer border-b-2 border-bg px-1 py-2 text-lg transition-all hover:border-b-2 hover:border-accent hover:drop-shadow-[0_0_20px_#AE9B84]"
                to={"/"}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className="cursor-pointer border-b-2 border-bg px-1 py-2 text-lg transition-all hover:border-b-2 hover:border-accent hover:drop-shadow-[0_0_20px_#AE9B84]"
                to={"/store"}
                onClick={() => setIsMenuOpen(false)}
              >
                Store
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden justify-between lg:flex">
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
                content={<CartCard />}
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
            </ConfigProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
