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
      {/* <Icon
        path={mdiWindowClose}
        size={0.6}
        className="cursor-pointer transition-all hover:scale-150"
        onClick={() => {
          setFilterTags((prev) => {
            const newFilters = [...prev];
            newFilters.splice(newFilters.indexOf(text), 1);
            return newFilters;
          });
        }}
      /> */}
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
    <div className="w-72 shrink-0 select-none p-10">
      <div className="">
        <div className="flex items-center justify-between bg-bg">
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
              defaultValue={[]}
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

  function isInCart(id) {
    for (let i in cart) if (cart[i].fruitId == id) return true;
    return false;
  }

  return (
    <section className="flex">
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
      <div className="flex w-full flex-col items-start gap-5 pr-10 pt-10">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>Items ({filteredFruits.length})</span>
          {showFav && (
            <span className="font-mono text-base text-accent">
              -- Favourite
            </span>
          )}
        </div>
        <div className="flex gap-3">
          {filterTags.map((item, index) => (
            <Tags
              text={item}
              setFilterTags={setFilterTags}
              key={item + index}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-7">
          {filteredFruits.map((fruit, index) => {
            return (
              <div
                className="group relative shrink-0 select-none rounded-2xl border-2 border-dashed border-dash"
                key={fruit.name + index}
              >
                <Icon
                  path={favs.includes(fruit.id) ? mdiHeart : mdiHeartOutline}
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
                      return newArr;
                    });
                  }}
                />
                <Link
                  to={`/store/${fruit.slug}`}
                  className="rounded-2xl"
                  key={fruit.name + index}
                >
                  <div className="px-[200px] pb-[150px] pt-[180px]">
                    <img
                      src={fruit.src}
                      alt={fruit.name}
                      className="size-[100px] transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84]"
                    />
                  </div>
                </Link>
                <div className="flex w-full items-center justify-between px-10 pb-10">
                  <div className="flex flex-col justify-between">
                    <h3 className="font-bold">{fruit.name}</h3>
                    <span className="text-gray">{fruit.family} family</span>
                    <span className="font-mono font-bold">${fruit.price}</span>
                  </div>
                  <Icon
                    path={isInCart(fruit.id) ? mdiCart : mdiCartOutline}
                    size={1}
                    className="cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_#ae9b84]"
                    color="#ae9b84"
                    onClick={() => {
                      setCart((prev) => {
                        const newCart = [...prev];
                        if (!isInCart(fruit.id)) {
                          newCart.push({ fruitId: fruit.id, count: 1 });
                          return newCart;
                        }
                        for (let i in newCart)
                          if (newCart[i].fruitId == fruit.id)
                            newCart.splice(i, 1);
                        return newCart;
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
