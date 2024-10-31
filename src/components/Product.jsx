import { useNavigate, useParams } from "react-router";
import { FRUITS } from "../utils/constants";
import Icon from "@mdi/react";
import {
  mdiCubeOutline,
  mdiMinus,
  mdiCart,
  mdiPlus,
  mdiCursorDefault,
  mdiKeyboardBackspace,
  mdiHeartOutline,
  mdiHeart,
} from "@mdi/js";
import { useContext, useEffect, useState } from "react";
import { CartContext, FavContext } from "./App";

function Tags({ text, isVitamin }) {
  if (isVitamin)
    return (
      <span className="rounded-full bg-accent px-3 font-mono text-xs font-black leading-6 text-black transition-all hover:scale-110">
        Vitamin {text}
      </span>
    );
  return (
    <span className="rounded-full bg-accent px-3 font-mono text-xs font-black leading-6 text-black transition-all hover:scale-110">
      {text}
    </span>
  );
}

export default function Product() {
  let { slug } = useParams();
  let fruit = FRUITS[getIndex(slug)];
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { favs, setFavs } = useContext(FavContext);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  function getIndex(slug) {
    for (let i = 0; i < 25; i++)
      if (FRUITS[i].slug == slug) return FRUITS[i].id;
  }

  function isInCart(id) {
    for (let i in cart) if (cart[i].fruitId == id) return true;
    return false;
  }

  function isFav(id) {
    for (let i in favs) if (favs[i] == id) return true;
    return false;
  }

  function getQty(id) {
    for (let i in cart) if (cart[i].fruitId == id) return cart[i].count;
    return 1;
  }

  useEffect(() => {
    if (isInCart(fruit.id)) setQty(getQty);
    if (isFav(fruit.id)) setFav(true);
  }, []);

  return (
    <div className="relative flex items-start gap-10 p-20">
      <Icon
        path={mdiKeyboardBackspace}
        size={1.5}
        className="absolute left-10 top-5 cursor-pointer text-accent transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="group relative shrink-0 select-none rounded-2xl border-2 border-dashed border-dash p-[180px]">
        <img
          src={fruit.src}
          alt={fruit.name}
          className="size-[100px] transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84]"
        />
        <Icon
          path={fav ? mdiHeart : mdiHeartOutline}
          size={1}
          className="absolute right-10 top-10 cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_red]"
          color={fav ? "red" : "white"}
          onClick={() => {
            setFav(!fav);
            setFavs((prev) => {
              const newArr = [...prev];
              if (isFav(fruit.id)) {
                for (let i in newArr)
                  if (favs[i] == fruit.id) newArr.splice(i, 1);
                return newArr;
              }
              newArr.push(fruit.id);
              return newArr;
            });
          }}
        />
        <div className="absolute -bottom-10 left-0 flex items-center gap-2">
          {fruit.colors.map((color) => (
            <Tags text={color} isVitamin={false} key={color + fruit.id} />
          ))}
          {fruit.vitamins.map((vitamin) => (
            <Tags text={vitamin} isVitamin={true} key={vitamin + fruit.id} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-7">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{fruit.name}</h1>
          <h5 className="text-sm text-gray">{fruit.family} family</h5>
          <div className="flex gap-1 text-accent">
            <Icon path={mdiCubeOutline} size={0.8} />
            <h4 className="font-mono text-sm font-bold">In Stock</h4>
          </div>
          <h5 className="font-mono text-sm font-bold">${fruit.price}</h5>
          <div className="flex gap-2">
            <button
              className="size-5 rounded-md bg-secondary p-[5px] transition-all hover:scale-125"
              onClick={() => {
                if (qty == 1) return;
                setQty(qty - 1);
                if (isInCart(fruit.id)) {
                  setCart((prev) => {
                    const newCart = [...prev];
                    for (let i in newCart)
                      if (newCart[i].fruitId == fruit.id)
                        newCart[i].count = qty - 1;
                    return newCart;
                  });
                }
              }}
            >
              <Icon path={mdiMinus} size={0.45} />
            </button>
            <span>{qty}</span>
            <button
              className="size-5 rounded-md bg-secondary p-[5px] transition-all hover:scale-125"
              onClick={() => {
                setQty(qty + 1);
                if (isInCart(fruit.id)) {
                  setCart((prev) => {
                    const newCart = [...prev];
                    for (let i in newCart)
                      if (newCart[i].fruitId == fruit.id)
                        newCart[i].count = qty + 1;
                    return newCart;
                  });
                }
              }}
            >
              <Icon path={mdiPlus} size={0.45} />
            </button>
          </div>
        </div>
        <div className="w-3/5 text-justify">{fruit.desc}</div>
        <div className="flex w-[400px] flex-col gap-3">
          <button
            className="flex justify-center gap-3 rounded-xl bg-accent px-24 py-4 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84]"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Icon path={mdiCursorDefault} size={1} />
            Buy Now
          </button>
          <button
            className="flex justify-center gap-3 rounded-xl bg-secondary px-24 py-4 font-mono font-bold text-accent transition-all duration-500 hover:bg-accent hover:text-black hover:shadow-[0_0_10px] hover:shadow-accent"
            onClick={() => {
              setCart((prev) => {
                const newCart = [...prev];
                if (!isInCart(fruit.id)) {
                  newCart.push({ fruitId: fruit.id, count: qty });
                  return newCart;
                }
                for (let i in newCart)
                  if (newCart[i].fruitId == fruit.id) newCart.splice(i, 1);
                return newCart;
              });
            }}
          >
            <Icon path={mdiCart} size={1} />
            {isInCart(fruit.id) ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
