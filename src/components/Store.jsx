import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiWindowClose,
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

function Tags({ text, setFilters }) {
  let textToDisplay = text.length <= 2 ? "Vitamin " + text : text;
  return (
    <div className="flex select-none items-center gap-1 rounded-full bg-accent px-3 py-1 font-mono text-xs font-black text-black">
      <span className="">{textToDisplay}</span>
      <Icon
        path={mdiWindowClose}
        size={0.6}
        className="cursor-pointer transition-all hover:scale-150"
        onClick={() => {
          setFilters((prev) => {
            const newFilters = [...prev];
            newFilters.splice(newFilters.indexOf(text), 1);
            return newFilters;
          });
        }}
      />
    </div>
  );
}

function ColorCheckBox({ color, onClick }) {
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
        onClick={onClick}
      >
        {color}
      </Checkbox>
    </ConfigProvider>
  );
}

function Aside({ filters, setFilters }) {
  const [colors, setColors] = useState([]);
  const [families, setFamilies] = useState([]);
  const [vitamins, setVitamins] = useState([]);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isFamilyOpen, setIsFamilyOpen] = useState(true);
  const [isVitaminOpen, setIsVitaminOpen] = useState(true);

  function handleColorChange(e) {
    let val = e.target.value;
    const newColors = [...colors];
    if (newColors.indexOf(val) == -1) newColors.push(val);
    else newColors.splice(newColors.indexOf(val), 1);
    setColors(newColors);
  }
  function handleFamilyChange(checkedValues) {
    const newValues = [...checkedValues];
    if (families.length != 0)
      newValues.splice(newValues.indexOf(families[0]), 1);
    setFamilies(newValues);
  }
  function handleVitaminsChange(checkedValues) {
    setVitamins(checkedValues);
  }

  useEffect(() => {
    setFilters(colors.concat(families).concat(vitamins));
  }, [colors, families, vitamins]);

  return (
    <div className="w-72 shrink-0 p-10">
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
          className={`m-6 origin-top transition-all duration-500 ${isColorOpen ? "" : "scale-y-0"}`}
        >
          <Checkbox.Group className="flex gap-5">
            {COLOROPTIONS.map((color, index) => (
              <ColorCheckBox
                color={color}
                onClick={handleColorChange}
                key={color + index}
              />
            ))}
          </Checkbox.Group>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Family {families.length > 0 ? `(${families.length})` : ""}
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
              className={`flex origin-top flex-col gap-5 transition-all duration-500 ${isFamilyOpen ? "" : "scale-y-0"}`}
              onChange={handleFamilyChange}
              value={families}
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
              className={`flex origin-top flex-col gap-5 transition-all duration-500 ${isVitaminOpen ? "" : "scale-y-0"}`}
              onChange={handleVitaminsChange}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  const [filters, setFilters] = useState([]);
  const { favs, setFavs } = useContext(FavContext);
  const { cart, setCart } = useContext(CartContext);

  function isInCart(id) {
    for (let i in cart) if (cart[i].fruitId == id) return true;
    return false;
  }

  return (
    <section className="flex">
      <Aside filters={filters} setFilters={setFilters} />
      <div className="flex w-full flex-col items-start gap-5 pr-10 pt-10">
        <h1 className="text-2xl font-bold">Items ( {25} )</h1>
        <div className="flex gap-3">
          {filters.map((item, index) => (
            <Tags text={item} setFilters={setFilters} key={item + index} />
          ))}
        </div>
        <div className="flex flex-wrap gap-7">
          {FRUITS.map((fruit, index) => {
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
