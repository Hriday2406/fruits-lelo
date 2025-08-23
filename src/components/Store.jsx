import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiChevronUp,
  // mdiWindowClose,
  mdiHeart,
  mdiHeartOutline,
  mdiCartOutline,
  mdiCart,
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
    <div className="bg-accent flex items-center gap-1 rounded-full px-2 py-1 font-mono text-xs font-black text-black select-none">
      <button
        aria-label={`Remove filter ${text}`}
        className="-ml-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/10 text-base font-extrabold text-white shadow-[0_0_14px_rgba(174,155,132,0.35)] transition-all duration-200 hover:scale-110 active:scale-95"
        onClick={() => onRemove(text)}
      >
        X
      </button>
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

  return (
    <div className="w-72 shrink-0 p-10 select-none">
      <div className="">
        <div className="bg-bg flex items-center justify-between">
          <h1 className="text-2xl font-bold">
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
          className={`m-6 origin-top overflow-hidden transition-all duration-500 ${isColorOpen ? "h-72" : "h-0"}`}
        >
          <Checkbox.Group
            className="flex gap-5"
            onChange={handleColorChange}
            value={colors}
          >
            {COLOROPTIONS.map((color, index) => (
              <ColorCheckBox color={color} key={color + index} />
            ))}
          </Checkbox.Group>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
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
        <div className="m-6">
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
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
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
        <div className="m-6 flex flex-col gap-5">
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
}

export default function Store({ searchText, showFav }) {
  const [colors, setColors] = useState([]);
  const [family, setFamily] = useState("");
  const [vitamins, setVitamins] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState(FRUITS);
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
      // clear search by emitting an event or using global setter — try local setter via window (fallback)
      // Prefer to update via location: dispatch a custom event so parent can clear search.
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
    <section className="flex overflow-hidden">
      <Aside
        filterTags={filterTags}
        setFilterTags={setFilterTags}
        colors={colors}
        setColors={setColors}
        family={family}
        setFamily={setFamily}
        vitamins={vitamins}
        setVitamins={setVitamins}
      />
      <div className="flex w-full flex-col items-start gap-5 pt-10 pr-10">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>Items ({filteredFruits.length})</span>
          {showFav && (
            <span className="text-accent font-mono text-base">
              -- Favourite
            </span>
          )}
        </div>
        <div className="flex gap-3">
          {filterTags.map((item, index) => (
            <Tags text={item} onRemove={removeFilterTag} key={item + index} />
          ))}
        </div>

        <Flipper
          flipKey={fruitsFlipKey}
          className="grid w-full grid-cols-3 gap-7 pb-20"
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
                      <div className="flex items-center justify-center pt-[180px] pb-[150px]">
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
