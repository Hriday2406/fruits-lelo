import { useNavigate, useParams } from "react-router";
import { getFruitBySlug, isInCart } from "../utils/fruitUtils";
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
import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext, FavContext } from "./App";
import NotFound from "./NotFound";
import { setCart as saveCart, setFavs as saveFavs } from "../utils/storage";

function Tags({ text, isVitamin }) {
  if (isVitamin)
    return (
      <span className="bg-accent rounded-full px-3 font-mono text-xs leading-6 font-black text-black transition-all hover:scale-110">
        Vitamin {text}
      </span>
    );
  return (
    <span className="bg-accent rounded-full px-3 font-mono text-xs leading-6 font-black text-black transition-all hover:scale-110">
      {text}
    </span>
  );
}

export default function Product() {
  let { slug } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { favs, setFavs } = useContext(FavContext);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  const getQty = useCallback(
    (id) => {
      for (let i in cart) if (cart[i].fruitId == id) return cart[i].count;
      return 1;
    },
    [cart],
  );

  let fruit = getFruitBySlug(slug);

  useEffect(() => {
    if (fruit && isInCart(cart, fruit.id)) setQty(getQty(fruit.id));
    if (fruit && favs.includes(fruit.id)) setFav(true);
  }, [fruit, favs, cart, getQty]);

  // If fruit not found, show NotFound component
  if (!fruit) {
    return <NotFound />;
  }

  return (
    <div className="relative flex flex-col items-start gap-6 p-4 pt-16 sm:p-8 sm:pt-20 lg:flex-row lg:gap-10 lg:p-20 lg:pt-24">
      <Icon
        path={mdiKeyboardBackspace}
        size={1.5}
        className="text-accent focus-visible:outline-accent absolute top-4 left-4 z-10 cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84] focus:outline-none focus-visible:outline-2 sm:top-8 sm:left-8 lg:top-10 lg:left-10"
        onClick={() => {
          navigate(-1);
        }}
        aria-label="Go back"
        role="button"
        tabIndex={0}
      />
      <div className="group border-dash relative w-full shrink-0 rounded-2xl border-2 border-dashed p-10 select-none sm:p-20 lg:w-auto lg:p-[180px]">
        <img
          src={fruit.src}
          alt={fruit.name}
          className="mx-auto size-24 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84] lg:size-[100px]"
        />
        <Icon
          path={fav ? mdiHeart : mdiHeartOutline}
          size={1}
          className="focus-visible:outline-accent absolute top-4 right-4 cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_red] focus:outline-none focus-visible:outline-2 sm:top-6 sm:right-6 lg:top-10 lg:right-10"
          color={fav ? "red" : "white"}
          onClick={() => {
            setFav(!fav);
            setFavs((prev) => {
              const newArr = [...prev];
              if (favs.includes(fruit.id)) {
                for (let i in newArr)
                  if (favs[i] == fruit.id) newArr.splice(i, 1);
                saveFavs(newArr);
                return newArr;
              }
              newArr.push(fruit.id);
              saveFavs(newArr);
              return newArr;
            });
          }}
          role="button"
          tabIndex={0}
          aria-label={fav ? "Remove favorite" : "Add favorite"}
        />
        <div className="absolute -bottom-8 left-0 flex flex-wrap items-center gap-2 sm:-bottom-10">
          {fruit.colors.map((color) => (
            <Tags text={color} isVitamin={false} key={color + fruit.id} />
          ))}
          {fruit.vitamins.map((vitamin) => (
            <Tags text={vitamin} isVitamin={true} key={vitamin + fruit.id} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-6 pt-8 lg:gap-7 lg:pt-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            {fruit.name}
          </h1>
          <h5 className="text-gray text-sm">{fruit.family} family</h5>
          <div className="text-accent flex gap-1">
            <Icon path={mdiCubeOutline} size={0.8} />
            <h4 className="font-mono text-sm font-bold">In Stock</h4>
          </div>
          <h5 className="font-mono text-sm font-bold">${fruit.price}</h5>
          <div className="flex gap-2">
            <button
              className="bg-secondary focus-visible:outline-accent size-8 cursor-pointer rounded-md p-[5px] transition-all hover:scale-125 focus:outline-none focus-visible:outline-2 sm:size-10 lg:size-5"
              onClick={() => {
                if (qty == 1) return;
                setQty(qty - 1);
                if (isInCart(cart, fruit.id)) {
                  setCart((prev) => {
                    const newCart = [...prev];
                    for (let i in newCart)
                      if (newCart[i].fruitId == fruit.id)
                        newCart[i].count = qty - 1;
                    saveCart(newCart);
                    return newCart;
                  });
                }
              }}
            >
              <Icon path={mdiMinus} size={0.45} />
            </button>
            <span className="flex min-w-8 items-center justify-center text-lg font-bold">
              {qty}
            </span>
            <button
              className="bg-secondary focus-visible:outline-accent size-8 cursor-pointer rounded-md p-[5px] transition-all hover:scale-125 focus:outline-none focus-visible:outline-2 sm:size-10 lg:size-5"
              onClick={() => {
                setQty(qty + 1);
                if (isInCart(cart, fruit.id)) {
                  setCart((prev) => {
                    const newCart = [...prev];
                    for (let i in newCart)
                      if (newCart[i].fruitId == fruit.id)
                        newCart[i].count = qty + 1;
                    saveCart(newCart);
                    return newCart;
                  });
                }
              }}
            >
              <Icon path={mdiPlus} size={0.45} />
            </button>
          </div>
        </div>
        <div className="text-justify text-sm sm:text-base lg:w-3/5">
          {fruit.desc}
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-[400px]">
          <button
            className="bg-accent hover:bg-secondary hover:text-accent focus-visible:outline-accent flex w-full cursor-pointer justify-center gap-3 rounded-xl px-6 py-3 font-mono font-bold text-black transition-all duration-500 hover:shadow-[0_0_10px_#AE9B84] focus:outline-none focus-visible:outline-2 sm:px-12 sm:py-4 lg:px-24"
            onClick={() => {
              navigate("/cart");
            }}
            aria-label="Buy now"
          >
            <Icon path={mdiCursorDefault} size={1} />
            Buy Now
          </button>
          <button
            className="bg-secondary text-accent hover:bg-accent hover:shadow-accent focus-visible:outline-accent flex w-full cursor-pointer justify-center gap-3 rounded-xl px-6 py-3 font-mono font-bold transition-all duration-500 hover:text-black hover:shadow-[0_0_10px] focus:outline-none focus-visible:outline-2 sm:px-12 sm:py-4 lg:px-24"
            onClick={() => {
              setCart((prev) => {
                const newCart = [...prev];
                if (!isInCart(cart, fruit.id)) {
                  newCart.push({ fruitId: fruit.id, count: qty });
                  saveCart(newCart);
                  return newCart;
                }
                for (let i in newCart)
                  if (newCart[i].fruitId == fruit.id) newCart.splice(i, 1);
                saveCart(newCart);
                return newCart;
              });
            }}
          >
            <Icon path={mdiCart} size={1} />
            {isInCart(cart, fruit.id) ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
