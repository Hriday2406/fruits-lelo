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
import { useContext, useRef, useState, useEffect, useCallback } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popup, setPopup] = useState({
    visible: false,
    type: "info",
    title: "",
    message: "",
  });

  // Debounced search function to improve performance
  const debouncedSetSearchText = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setSearchText(value), 300);
      };
    })(),
    [setSearchText],
  );

  useEffect(() => {
    const handler = () => {
      if (searchRef.current) searchRef.current.value = "";
      setSearchText("");
    };
    window.addEventListener("clearSearch", handler);
    return () => window.removeEventListener("clearSearch", handler);
  }, [setSearchText]);

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
    <header className="bg-bg border-secondary fixed top-0 right-0 left-0 z-50 border-b px-4 py-4 sm:px-10 sm:py-6">
      {/* Mobile Header */}
      <div className="flex h-full items-center justify-between lg:hidden">
        <Link
          to={"/"}
          className="text-accent cursor-pointer text-2xl font-bold transition-all hover:drop-shadow-[0_0_10px] sm:text-3xl"
        >
          Fruits Lelo.
        </Link>

        <div className="flex items-center gap-6">
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
                  className="focus-visible:outline-accent cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84] focus:outline-none focus-visible:outline-2"
                  onClick={() => {
                    setShowFav((prev) => !prev);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={showFav ? "View all" : "View favorites"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
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
                className="focus-visible:outline-accent cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84] focus:outline-none focus-visible:outline-2"
                onClick={() => {
                  navigate("/cart");
                }}
                role="button"
                tabIndex={0}
                aria-label="Open cart"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/cart");
                }}
              />
            </Badge>
          </ConfigProvider>

          {/* Hamburger Menu Button */}
          <button
            className="focus-visible:outline-accent p-2 transition-all hover:scale-125 focus:outline-none focus-visible:outline-2"
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

      {/* Mobile Menu Overlay - always mounted so it can animate */}
      <div className="lg:hidden">
        {/* Backdrop with blur effect; toggles opacity and pointer-events */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isMenuOpen
              ? "pointer-events-auto opacity-100 backdrop-blur-xs"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden={!isMenuOpen}
        />

        {/* Menu Panel with slide animation (transform) */}
        <aside
          className={`bg-bg border-dash fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] transform rounded-l-2xl border-2 border-dashed shadow-2xl transition-transform duration-300 ${
            isMenuOpen
              ? "translate-x-0 shadow-[0_0_15px_#AE9B84]"
              : "translate-x-full"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex h-full flex-col">
            {/* Menu Header */}
            <div className="border-secondary flex items-center justify-between border-b p-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="focus-visible:outline-accent p-2 transition-all duration-300 hover:scale-125 hover:rotate-90 focus:outline-none focus-visible:outline-2"
                aria-label="Close menu"
              >
                <Icon path={mdiClose} size={1} color="#ae9b84" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* Search */}
              <div>
                <form
                  action=""
                  className="bg-secondary flex items-center rounded-2xl p-3 transition-all duration-300 select-none hover:shadow-[0_0_10px_#AE9B84]"
                  onClick={() => {
                    searchRef.current && searchRef.current.focus();
                  }}
                >
                  <Icon path={mdiMagnify} size={0.9} color="#ae9b84" />
                  <input
                    type="text"
                    className="bg-secondary caret-accent flex-1 border-none px-3 text-sm outline-none placeholder:text-white"
                    ref={searchRef}
                    placeholder="Search fruits..."
                    onChange={(e) => {
                      debouncedSetSearchText(e.target.value);
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
                    size={0.8}
                    color="#ae9b84"
                    className="focus-visible:outline-accent cursor-pointer transition-all hover:scale-125 focus:outline-none focus-visible:outline-2"
                    onClick={() => {
                      if (searchRef.current) searchRef.current.value = "";
                      setSearchText("");
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Clear search"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (searchRef.current) searchRef.current.value = "";
                        setSearchText("");
                      }
                    }}
                  />
                </form>
              </div>

              {/* Navigation  */}
              <div>
                <h3 className="text-gray mb-3 text-sm font-bold tracking-wider uppercase">
                  Navigation
                </h3>
                <nav className="flex justify-between px-10">
                  <Link
                    to={"/"}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-accent px-4 py-2 text-center text-xl font-bold brightness-125 drop-shadow-[0_0_50px_#AE9B84] filter transition-all text-shadow-[0_0_20px_rgba(174,155,132,0.8)]"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/store"}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-accent px-4 py-2 text-center text-xl font-bold brightness-125 drop-shadow-[0_0_50px_#AE9B84] filter transition-all text-shadow-[0_0_20px_rgba(174,155,132,0.8)]"
                  >
                    Store
                  </Link>
                </nav>
              </div>

              {/* Quick Actions  */}
              <div>
                <h3 className="text-gray mb-3 text-xs font-medium tracking-wider uppercase opacity-60">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    className="bg-secondary hover:bg-accent group w-full rounded-lg p-3 text-left text-sm font-medium opacity-80 transition-all duration-300 hover:text-black hover:opacity-100"
                    onClick={() => {
                      navigate("/cart");
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>Cart ({cart.length})</span>
                      <Icon
                        path={mdiCart}
                        size={0.7}
                        color="#ae9b84"
                        className="opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-80"
                      />
                    </div>
                  </button>
                  <Link
                    className="bg-secondary hover:bg-accent group block w-full rounded-lg p-3 text-sm font-medium opacity-80 transition-all duration-300 hover:text-black hover:opacity-100"
                    to={"/store"}
                    onClick={() => {
                      setShowFav(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>Favorites ({favs.length})</span>
                      <Icon
                        path={mdiHeart}
                        size={0.7}
                        color="#ae9b84"
                        className="opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-80"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Desktop Header */}
      <div className="hidden h-full items-center justify-between lg:flex">
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
              searchRef.current && searchRef.current.focus();
            }}
          >
            <Icon path={mdiMagnify} size={1} color="#ae9b84" />
            <input
              type="text"
              className="bg-secondary caret-accent border-none px-3 outline-none placeholder:text-white"
              ref={searchRef}
              placeholder="Search"
              onChange={(e) => {
                debouncedSetSearchText(e.target.value);
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
                if (searchRef.current) searchRef.current.value = "";
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
            </ConfigProvider>
          </div>
        </div>
      </div>
      <Popup
        visible={popup.visible}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() => setPopup((p) => ({ ...p, visible: false }))}
      />
    </header>
  );
}
