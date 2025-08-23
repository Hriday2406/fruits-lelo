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
    <div className="relative flex flex-col items-start gap-6 p-4 sm:p-8 lg:flex-row lg:gap-10 lg:p-20">
      <Icon
        path={mdiKeyboardBackspace}
        size={1.5}
        className="absolute left-4 top-2 cursor-pointer text-accent transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84] sm:left-8 sm:top-5 lg:left-10"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="group relative w-full shrink-0 select-none rounded-2xl border-2 border-dashed border-dash p-12 sm:p-20 lg:w-auto lg:p-[180px]">
        <img
          src={fruit.src}
          alt={fruit.name}
          className="mx-auto size-16 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84] sm:size-20 lg:size-[100px]"
        />
        <Icon
          path={fav ? mdiHeart : mdiHeartOutline}
          size={1}
          className="absolute right-4 top-4 cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_red] sm:right-6 sm:top-6 lg:right-10 lg:top-10"
          color={fav ? "red" : "white"}
          onClick={() => {
            setFav(!fav);
            setFavs((prev) => {
              const newArr = [...prev];
              if (favs.includes(fruit.id)) {
                for (let i in newArr)
                  if (favs[i] == fruit.id) newArr.splice(i, 1);
                return newArr;
              }
              newArr.push(fruit.id);
              localStorage.setItem("favs", JSON.stringify(newArr));
              return newArr;
            });
          }}
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
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{fruit.name}</h1>
          <h5 className="text-sm text-gray">{fruit.family} family</h5>
          <div className="flex gap-1 text-accent">
            <Icon path={mdiCubeOutline} size={0.8} />
            <h4 className="font-mono text-sm font-bold">In Stock</h4>
          </div>
          <h5 className="font-mono text-sm font-bold">${fruit.price}</h5>
          <div className="flex gap-2">
            <button
              className="size-8 rounded-md bg-secondary p-[5px] transition-all hover:scale-125 sm:size-10 lg:size-5"
              onClick={() => {
                if (qty == 1) return;
                setQty(qty - 1);
                if (isInCart(cart, fruit.id)) {
                  setCart((prev) => {
                    const newCart = [...prev];
                    for (let i in newCart)
                      if (newCart[i].fruitId == fruit.id)
                        newCart[i].count = qty - 1;
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    return newCart;
                  });
                }
              }}
            >
              <Icon path={mdiMinus} size={0.45} />
            </button>
            <span className="flex min-w-8 items-center justify-center text-lg font-bold">{qty}</span>
            <button
              className="size-8 rounded-md bg-secondary p-[5px] transition-all hover:scale-125 sm:size-10 lg:size-5"
              onClick={() => {
                setQty(qty + 1);
                if (isInCart(cart, fruit.id)) {
                  setCart((prev) => {
                    const newCart = [...prev];
                    for (let i in newCart)
                      if (newCart[i].fruitId == fruit.id)
                        newCart[i].count = qty + 1;
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    return newCart;
                  });
                }
              }}
            >
              <Icon path={mdiPlus} size={0.45} />
            </button>
          </div>
        </div>
        <div className="text-justify text-sm sm:text-base lg:w-3/5">{fruit.desc}</div>
        <div className="flex w-full flex-col gap-3 lg:w-[400px]">
          <button
            className="flex w-full justify-center gap-3 rounded-xl bg-accent px-6 py-3 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84] sm:px-12 sm:py-4 lg:px-24"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Icon path={mdiCursorDefault} size={1} />
            Buy Now
          </button>
          <button
            className="flex w-full justify-center gap-3 rounded-xl bg-secondary px-6 py-3 font-mono font-bold text-accent transition-all duration-500 hover:bg-accent hover:text-black hover:shadow-[0_0_10px] hover:shadow-accent sm:px-12 sm:py-4 lg:px-24"
            onClick={() => {
              setCart((prev) => {
                const newCart = [...prev];
                if (!isInCart(cart, fruit.id)) {
                  newCart.push({ fruitId: fruit.id, count: qty });
                  localStorage.setItem("cart", JSON.stringify(newCart));
                  return newCart;
                }
                for (let i in newCart)
                  if (newCart[i].fruitId == fruit.id) newCart.splice(i, 1);
                localStorage.setItem("cart", JSON.stringify(newCart));
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
