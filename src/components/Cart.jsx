import Icon from "@mdi/react";
import {
  mdiKeyboardBackspace,
  mdiTrashCan,
  mdiCubeOutline,
  mdiMinus,
  mdiPlus,
  mdiCheckAll,
} from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";
import { FRUITS } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./App";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  function handleDelete(index) {
    setCart((prev) => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  }

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cart.length; i++)
      temp += FRUITS[cart[i].fruitId].price * cart[i].count;
    setTotal(temp);
  }, [cart]);

  return (
    <div className="relative flex items-start justify-between px-14 py-32">
      <div className="absolute left-10 top-5">
        <Icon
          path={mdiKeyboardBackspace}
          size={1.5}
          className="cursor-pointer text-accent transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="pl-4 pt-3 text-2xl font-bold">Shopping Cart</h1>
      </div>
      <div className="flex w-2/5 flex-col gap-[25px]">
        {cart.map((item, index) => {
          const fruit = FRUITS[item.fruitId];
          return (
            <div className="flex items-center gap-[25px]" key={fruit.id}>
              <Link
                to={`/store/${fruit.slug}`}
                className="group shrink-0 select-none"
              >
                <div className="shrink-0 rounded-2xl border-2 border-dashed border-dash p-[40px]">
                  <img
                    src={fruit.src}
                    alt={fruit.name}
                    className="size-[40px] transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_15px_#AE9B84]"
                  />
                </div>
              </Link>
              <div className="flex w-full items-center justify-between">
                <div className="justify flex flex-col gap-2">
                  <h3 className="font-bold">{fruit.name}</h3>
                  <span className="text-gray">{fruit.family} family</span>
                  <div className="flex gap-1 text-accent">
                    <Icon path={mdiCubeOutline} size={0.8} />
                    <h4 className="font-mono text-sm font-bold">In Stock</h4>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="size-5 rounded-md bg-secondary p-[5px] transition-all hover:scale-125"
                    onClick={() => {
                      setCart((prev) => {
                        const newCart = [...prev];
                        for (let i in newCart)
                          if (newCart[i].fruitId == fruit.id) {
                            if (newCart[i].count == 1) return newCart;
                            newCart[i].count -= 1;
                          }
                        return newCart;
                      });
                    }}
                  >
                    <Icon path={mdiMinus} size={0.45} />
                  </button>
                  <span>{item.count}</span>
                  <button
                    className="size-5 rounded-md bg-secondary p-[5px] transition-all hover:scale-125"
                    onClick={() => {
                      setCart((prev) => {
                        const newCart = [...prev];
                        for (let i in newCart)
                          if (newCart[i].fruitId == fruit.id)
                            newCart[i].count += 1;
                        return newCart;
                      });
                    }}
                  >
                    <Icon path={mdiPlus} size={0.45} />
                  </button>
                </div>
                <Icon
                  path={mdiTrashCan}
                  size={1.1}
                  color="red"
                  className="cursor-pointer rounded-md bg-secondary p-1 transition-all hover:scale-125"
                  onClick={() => {
                    handleDelete(index);
                  }}
                />
                <span className="font-mono font-bold">${fruit.price}</span>
              </div>
            </div>
          );
        })}
        {cart.length == 0 && (
          <p className="w-fit rounded-2xl border-2 border-dashed border-dash p-10 font-mono text-xl text-accent">
            CART IS EMPTY.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-[25px] rounded-2xl border-2 border-dashed border-dash p-9 text-white transition-all duration-500 hover:shadow-[0_0_15px_#AE9B84]">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <div className="flex flex-col gap-2 border-y-[1px] border-gray py-6 font-mono font-normal text-white">
          {cart.map((item) => {
            const fruit = FRUITS[item.fruitId];
            return (
              <div
                className="flex justify-between"
                key={fruit.name + item.count}
              >
                <span>
                  ${fruit.price} x {item.count}
                </span>
                <span>${(fruit.price * item.count).toFixed(1)}</span>
              </div>
            );
          })}
          {cart.length == 0 && (
            <p className="text-center font-mono text-lg text-accent">
              CART IS EMPTY.
            </p>
          )}
        </div>
        <div className="flex justify-between text-2xl font-bold">
          <div className="flex items-center gap-2">
            <span>Total</span>
            <span className="text-base font-normal text-gray">
              ({cart.length} Items)
            </span>
          </div>
          <span className="font-mono">${total.toFixed(1)}</span>
        </div>
        <button
          className="flex w-[300px] items-center justify-center gap-3 rounded-xl bg-accent px-24 py-4 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84]"
          onClick={() => {
            if (cart.length == 0) {
              alert(
                "You cannot checkout with an empty cart, put some fruits in the cart first.",
              );
              return;
            }

            alert(
              "Yay! You have bought the fruits! It will be delivered to you.",
            );
            setCart([]);
          }}
        >
          <Icon path={mdiCheckAll} size={0.8} />
          Checkout
        </button>
      </div>
    </div>
  );
}
