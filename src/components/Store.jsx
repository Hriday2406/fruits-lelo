import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiWindowClose,
  mdiHeart,
  mdiHeartOutline,
  mdiCartOutline,
  mdiCart,
  mdiFilterVariant,
} from "@mdi/js";
import { Checkbox, ConfigProvider } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  COLOROPTIONS,
  COLOR_HEX,
  FAMILYOPTIONS,
  FRUITS,
  VITAMINSOPTIONS,
} from "../utils/constants";
import { CartContext, FavContext } from "./App";
import { Link } from "react-router-dom";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import { isInCart } from "../utils/fruitUtils";
import { setCart as saveCart, setFavs as saveFavs } from "../utils/storage";

function Tags({ text, onRemove }) {
  if (text == "") return null;
  let textToDisplay = '"' + text + '"';
  if (text == "C" || text == "A" || text == "K" || text == "E" || text == "B6")
    textToDisplay = "Vitamin " + text;
  else if (
    text == "Rose" ||
    text == "Citrus" ||
    text == "Nightshade" ||
    text == "Gourd" ||
    text == "Palm" ||
    text == "Cashew" ||
    text == "Berry" ||
    text == "Laurel" ||
    text == "Other" ||
    text == "Purple" ||
    text == "Green" ||
    text == "Brown" ||
    text == "Red" ||
    text == "Orange" ||
    text == "Yellow" ||
    text == "Blue" ||
    text == "Black"
  )
    textToDisplay = text;

  return (
    <div className="bg-accent flex items-center gap-2 rounded-full px-2 py-1 font-mono text-xs font-black text-black select-none">
      <button
        aria-label={`Remove filter ${text}`}
        className="-ml-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/10 text-base font-extrabold text-white shadow-[0_0_14px_rgba(174,155,132,0.35)] transition-all duration-200 hover:scale-110 active:scale-95"
        onClick={() => onRemove(text)}
      >
        X
      </button>
      <span className="ml-1">{textToDisplay}</span>
    </div>
  );
}

function Aside({
  colors,
  setColors,
  family,
  setFamily,
  vitamins,
  setVitamins,
  isFilterOpen,
  setIsFilterOpen,
}) {
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isFamilyOpen, setIsFamilyOpen] = useState(true);
  const [isVitaminOpen, setIsVitaminOpen] = useState(true);

  // color changes handled by custom grid buttons below
  function handleFamilyChange(checkedValues) {
    if (checkedValues.length == 0) setFamily("");
    else setFamily(checkedValues[0]);
  }
  function handleVitaminsChange(checkedValues) {
    setVitamins(checkedValues);
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear all filters button */}
      <div className="flex justify-start md:justify-end">
        <button
          className="bg-secondary hover:bg-accent cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-black"
          onClick={() => {
            setColors([]);
            setFamily("");
            setVitamins([]);
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Color Filter */}
      <div>
        <div className="bg-bg flex items-center justify-between">
          <h1 className="text-xl font-bold lg:text-2xl">
            Color {colors.length > 0 ? `(${colors.length})` : ""}
          </h1>
          <Icon
            path={isColorOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsColorOpen((prev) => !prev);
            }}
          />
        </div>
        <div
          className={`mt-4 origin-top overflow-hidden transition-all duration-500 ${isColorOpen ? "h-72" : "h-0"}`}
        >
          <div className="grid w-full grid-cols-3 items-start gap-4 lg:gap-6">
            {COLOROPTIONS.map((color, index) => {
              const themeColor = COLOR_HEX[color] || "#ae9b84";
              const selected = colors.includes(color);
              return (
                <button
                  key={color + index}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setColors((prev) => {
                      if (prev.includes(color))
                        return prev.filter((c) => c !== color);
                      return [...prev, color];
                    });
                  }}
                  className="flex w-full cursor-pointer flex-col items-center justify-start gap-2"
                >
                  <span
                    className={`relative inline-block rounded-full shadow-sm transition-all ${selected ? "ring-accent ring-2 ring-offset-1" : ""}`}
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: themeColor,
                      boxShadow: selected
                        ? "0 0 14px rgba(174,155,132,0.6)"
                        : undefined,
                    }}
                  >
                    {selected && (
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#ffffff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="mt-3 w-full text-center text-sm">
                    {color}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Family Filter */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold lg:text-2xl">
            Family {family != "" ? "(1)" : ""}
          </h1>
          <Icon
            path={isFamilyOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsFamilyOpen((prev) => !prev);
            }}
          />
        </div>
        <div className="mt-4 lg:m-6">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ae9b84",
                colorText: "#fff",
                fontFamily: "Roboto",
                colorBgContainer: "#0f0f0f",
                colorBorder: "#ae9b84",
                borderRadiusSM: 0,
              },
            }}
          >
            <Checkbox.Group
              options={FAMILYOPTIONS}
              defaultValue={[]}
              className={`flex origin-top flex-col flex-nowrap gap-5 overflow-hidden transition-all duration-500 ${isFamilyOpen ? "h-[366px]" : "h-0"}`}
              onChange={handleFamilyChange}
              value={family}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Vitamins Filter */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold lg:text-2xl">
            Vitamins {vitamins.length > 0 ? `(${vitamins.length})` : ""}
          </h1>
          <Icon
            path={isVitaminOpen ? mdiChevronDown : mdiChevronUp}
            size={1}
            color="#ae9b84"
            className="cursor-pointer transition-all hover:scale-125"
            onClick={() => {
              setIsVitaminOpen((prev) => !prev);
            }}
          />
        </div>
        <div className="mt-4 flex flex-col gap-5 lg:m-6">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ae9b84",
                colorText: "#fff",
                fontFamily: "Roboto",
                colorBgContainer: "#0f0f0f",
                colorBorder: "#ae9b84",
                borderRadiusSM: 0,
              },
            }}
          >
            <Checkbox.Group
              options={VITAMINSOPTIONS}
              value={vitamins}
              className={`flex origin-top flex-col flex-nowrap gap-5 overflow-hidden transition-all duration-500 ${isVitaminOpen ? "h-48" : "h-0"}`}
              onChange={handleVitaminsChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Overlay - always mounted so it can animate */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isFilterOpen
              ? "pointer-events-auto opacity-100 backdrop-blur-xs"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsFilterOpen(false)}
          aria-hidden={!isFilterOpen}
        />

        {/* Sliding Panel from right */}
        <aside
          className={`bg-bg border-dash fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] transform rounded-l-2xl border-2 border-dashed shadow-2xl transition-transform duration-300 ${
            isFilterOpen
              ? "translate-x-0 shadow-[0_0_15px_#AE9B84]"
              : "translate-x-full"
          }`}
          aria-hidden={!isFilterOpen}
        >
          <div className="flex h-full flex-col">
            <div className="border-secondary flex items-center justify-between border-b p-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 transition-all hover:scale-125"
              >
                <Icon path={mdiWindowClose} size={1} color="#ae9b84" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <FilterContent />
            </div>
          </div>
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <div className="bg-bg md:scrollbar-thin md:scrollbar-webkit border-dash fixed top-24 left-0 hidden h-[calc(100vh-5rem)] w-72 overflow-y-auto border-r-2 border-dashed p-10 pt-4 select-none lg:block">
        <FilterContent />
      </div>
    </>
  );
}

export default function Store({ searchText, showFav }) {
  const [colors, setColors] = useState([]);
  const [family, setFamily] = useState("");
  const [vitamins, setVitamins] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState(FRUITS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { favs, setFavs } = useContext(FavContext);
  const { cart, setCart } = useContext(CartContext);
  const fruitsFlipKey =
    filteredFruits.length === 0
      ? "no-results"
      : `${filteredFruits.map((fruit) => fruit.id).join(",")}`;

  function getFavFruits() {
    return FRUITS.filter((fruit) => favs.includes(fruit.id));
  }

  useEffect(() => {
    setFilterTags(colors.concat(family).concat(vitamins).concat(searchText));
    let tempArr =
      searchText.length == 0
        ? showFav
          ? getFavFruits()
          : [...FRUITS]
        : (showFav ? getFavFruits() : FRUITS).filter((fruit) =>
            fruit.name.toLowerCase().includes(searchText.toLowerCase()),
          );

    if (colors.length > 0) {
      tempArr = tempArr.filter((fruit) => {
        return (
          colors.filter((color) => {
            return fruit.colors.includes(color);
          }).length == colors.length
        );
      });
    }
    if (family != "") {
      tempArr = tempArr.filter((fruit) => fruit.family == family);
    }
    if (vitamins.length > 0) {
      tempArr = tempArr.filter((fruit) => {
        return (
          vitamins.filter((vitamin) => {
            return fruit.vitamins.includes(vitamin);
          }).length == vitamins.length
        );
      });
    }
    setFilteredFruits(tempArr);
  }, [colors, family, vitamins, searchText, showFav, favs]);

  function removeFilterTag(tag) {
    // If tag matches a color, remove from colors
    if (colors.includes(tag)) {
      setColors((prev) => prev.filter((c) => c !== tag));
      return;
    }
    // If tag matches family
    if (family === tag) {
      setFamily("");
      return;
    }
    // If tag matches a vitamin
    if (vitamins.includes(tag)) {
      setVitamins((prev) => prev.filter((v) => v !== tag));
      return;
    }
    // Otherwise assume it's the search text
    if (tag === searchText) {
      const ev = new CustomEvent("clearSearch");
      window.dispatchEvent(ev);
      return;
    }
  }

  function onExit(element, index, removeElement) {
    spring({
      onUpdate: (value) => {
        element.style.opacity = `${1 - value}`;
      },
      onComplete: removeElement,
    });
  }

  return (
    <section className="relative">
      <Aside
        colors={colors}
        setColors={setColors}
        family={family}
        setFamily={setFamily}
        vitamins={vitamins}
        setVitamins={setVitamins}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      <div className="flex w-full flex-col items-start gap-4 p-4 pb-24 lg:pt-10 lg:pr-10 lg:pb-40 lg:pl-80">
        {/* Mobile Filter Button and Header */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
            <span>Items ({filteredFruits.length})</span>
            {showFav && (
              <span className="text-accent font-mono text-sm sm:text-base">
                -- Favourite
              </span>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            className="bg-secondary hover:bg-accent flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all hover:text-black lg:hidden"
            onClick={() => setIsFilterOpen(true)}
          >
            <Icon path={mdiFilterVariant} size={0.8} />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {filterTags.map((item, index) => (
            <Tags text={item} onRemove={removeFilterTag} key={item + index} />
          ))}
        </div>

        <Flipper
          flipKey={fruitsFlipKey}
          className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {filteredFruits.length === 0 ? (
            <Flipped
              flipId="no-results"
              key="no-results"
              onExit={onExit}
              stagger
            >
              <div className="group border-dash relative flex shrink-0 items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center select-none">
                <div>
                  <h3 className="text-xl font-bold">Kuch bhi nahi mila</h3>
                  {searchText && (
                    <p className="text-gray mt-2">
                      "{searchText}" ke liye koi result nahi mila.
                    </p>
                  )}
                  <p className="text-accent mt-4">
                    Filters change karo ya search clear karo.
                  </p>
                </div>
              </div>
            </Flipped>
          ) : (
            filteredFruits.map((fruit, index) => {
              return (
                <Flipped
                  flipId={fruit.id}
                  key={fruit.name + index}
                  onExit={onExit}
                  stagger
                >
                  <div className="group border-dash relative shrink-0 rounded-2xl border-2 border-dashed select-none">
                    <Icon
                      path={
                        favs.includes(fruit.id) ? mdiHeart : mdiHeartOutline
                      }
                      size={1}
                      className="absolute top-10 right-10 cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_red]"
                      color={favs.includes(fruit.id) ? "red" : "white"}
                      onClick={() => {
                        setFavs((prev) => {
                          const newArr = [...prev];
                          if (favs.includes(fruit.id)) {
                            newArr.splice(favs.indexOf(fruit.id), 1);
                          } else {
                            newArr.push(fruit.id);
                          }
                          saveFavs(newArr);
                          return newArr;
                        });
                      }}
                    />
                    <Link
                      to={`/store/${fruit.slug}`}
                      className="rounded-2xl"
                      key={fruit.name + index}
                    >
                      <div className="flex items-center justify-center pt-22 pb-10 md:pt-[180px] md:pb-[150px]">
                        <div className="size-[100px]">
                          <img
                            src={fruit.src}
                            alt={fruit.name}
                            loading="lazy"
                            className="size-full transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84]"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="flex w-full items-center justify-between px-5 pb-5 text-sm md:px-10 md:pb-10">
                      <div className="flex flex-col justify-between">
                        <h3 className="font-bold">{fruit.name}</h3>
                        <span className="text-gray text-xs">
                          {fruit.family} family
                        </span>
                        <span className="font-mono font-bold">
                          ${fruit.price}
                        </span>
                      </div>
                      <Icon
                        path={
                          isInCart(cart, fruit.id) ? mdiCart : mdiCartOutline
                        }
                        size={1}
                        className="cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_#ae9b84]"
                        color="#ae9b84"
                        onClick={() => {
                          setCart((prev) => {
                            const newCart = [...prev];
                            if (!isInCart(cart, fruit.id)) {
                              newCart.push({ fruitId: fruit.id, count: 1 });
                              saveCart(newCart);
                              return newCart;
                            }
                            for (let i in newCart)
                              if (newCart[i].fruitId == fruit.id)
                                newCart.splice(i, 1);
                            saveCart(newCart);
                            return newCart;
                          });
                        }}
                      />
                    </div>
                  </div>
                </Flipped>
              );
            })
          )}
        </Flipper>
      </div>
    </section>
  );
}
