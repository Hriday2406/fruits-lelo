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
  FAMILYOPTIONS,
  FRUITS,
  VITAMINSOPTIONS,
} from "../utils/constants";
import { CartContext, FavContext } from "./App";
import { Link } from "react-router-dom";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import { isInCart } from "../utils/fruitUtils";
import NotFound from "./NotFound";

function Tags({ text, setFilterTags }) {
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
    <div className="flex select-none items-center gap-1 rounded-full bg-accent px-3 py-1 font-mono text-xs font-black text-black">
      <span className="">{textToDisplay}</span>
    </div>
  );
}

function ColorCheckBox({ color }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color,
          colorText: "#fff",
          fontFamily: "Roboto",
          colorBgContainer: color,
          colorBorder: color,
          borderRadiusSM: 50,
          controlInteractiveSize: 25,
          colorWhite: color == "Yellow" || color == "Orange" ? "#000" : "#fff",
        },
      }}
    >
      <Checkbox
        className="flex w-1/4 flex-col items-center justify-center gap-2"
        value={color}
      >
        {color}
      </Checkbox>
    </ConfigProvider>
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

  function handleColorChange(checkedValues) {
    setColors(checkedValues);
  }
  function handleFamilyChange(checkedValues) {
    if (checkedValues.length == 0) setFamily("");
    else setFamily(checkedValues[0]);
  }
  function handleVitaminsChange(checkedValues) {
    setVitamins(checkedValues);
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Color Filter */}
      <div>
        <div className="flex items-center justify-between bg-bg">
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
          className={`mt-4 origin-top overflow-hidden transition-all duration-500 lg:m-6 ${isColorOpen ? "h-72" : "h-0"}`}
        >
          <Checkbox.Group
            className="flex flex-wrap gap-3 lg:gap-5"
            onChange={handleColorChange}
            value={colors}
          >
            {COLOROPTIONS.map((color, index) => (
              <ColorCheckBox color={color} key={color + index} />
            ))}
          </Checkbox.Group>
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
              defaultValue={[]}
              className={`flex origin-top flex-col flex-nowrap gap-5 overflow-hidden transition-all duration-500 ${isVitaminOpen ? "h-48" : "h-0"}`}
              onChange={handleVitaminsChange}
              value={vitamins}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-bg shadow-lg">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-secondary p-6">
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
          </div>
        </div>
      )}
      
      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 hidden h-full w-72 select-none overflow-y-auto bg-bg p-10 pt-24 lg:block">
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
  }, [colors, family, vitamins, searchText, showFav]);

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
      
      <div className="flex w-full flex-col items-start gap-4 p-4 lg:pl-80 lg:pr-10 lg:pt-10">
        {/* Mobile Filter Button and Header */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
            <span>Items ({filteredFruits.length})</span>
            {showFav && (
              <span className="font-mono text-sm text-accent sm:text-base">
                -- Favourite
              </span>
            )}
          </div>
          
          {/* Mobile Filter Button */}
          <button
            className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 font-medium transition-all hover:bg-accent hover:text-black lg:hidden"
            onClick={() => setIsFilterOpen(true)}
          >
            <Icon path={mdiFilterVariant} size={0.8} />
            <span>Filter</span>
          </button>
        </div>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {filterTags.map((item, index) => (
            <Tags
              text={item}
              setFilterTags={setFilterTags}
              key={item + index}
            />
          ))}
        </div>

        <Flipper
          flipKey={fruitsFlipKey}
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7"
        >
          {filteredFruits.length === 0 ? (
            <Flipped
              flipId="no-results"
              key="no-results"
              onExit={onExit}
              stagger
            >
              <div className="group relative flex shrink-0 select-none items-center justify-center rounded-2xl border-2 border-dashed border-dash p-10 text-center">
                <div>
                  <h3 className="text-xl font-bold">Kuch bhi nahi mila</h3>
                  {searchText && (
                    <p className="mt-2 text-gray">
                      "{searchText}" ke liye koi result nahi mila.
                    </p>
                  )}
                  <p className="mt-4 text-accent">
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
                  <div className="group relative shrink-0 select-none rounded-2xl border-2 border-dashed border-dash">
                    <Icon
                      path={
                        favs.includes(fruit.id) ? mdiHeart : mdiHeartOutline
                      }
                      size={1}
                      className="absolute right-10 top-10 cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_red]"
                      color={favs.includes(fruit.id) ? "red" : "white"}
                      onClick={() => {
                        setFavs((prev) => {
                          const newArr = [...prev];
                          if (favs.includes(fruit.id)) {
                            newArr.splice(favs.indexOf(fruit.id), 1);
                            return newArr;
                          }
                          newArr.push(fruit.id);
                          localStorage.setItem("favs", JSON.stringify(newArr));
                          return newArr;
                        });
                      }}
                    />
                    <Link
                      to={`/store/${fruit.slug}`}
                      className="rounded-2xl"
                      key={fruit.name + index}
                    >
                      <div className="flex items-center justify-center pb-[150px] pt-[180px]">
                        <div className="size-[100px]">
                          <img
                            src={fruit.src}
                            alt={fruit.name}
                            className="size-full transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84]"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="flex w-full items-center justify-between px-10 pb-10">
                      <div className="flex flex-col justify-between">
                        <h3 className="font-bold">{fruit.name}</h3>
                        <span className="text-gray">{fruit.family} family</span>
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
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(newCart),
                              );
                              return newCart;
                            }
                            for (let i in newCart)
                              if (newCart[i].fruitId == fruit.id)
                                newCart.splice(i, 1);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(newCart),
                            );
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
        {/* </Flipper> */}
      </div>
    </section>
  );
}
