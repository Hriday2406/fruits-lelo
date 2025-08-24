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
      localStorage.setItem("cart", JSON.stringify(newCart));
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
    <div className="relative flex flex-col gap-6 px-4 py-4 pb-8 md:py-8 lg:flex-row lg:items-start lg:justify-between lg:px-14 lg:py-32">
      <div className="mb-4 flex items-center gap-3 md:flex-col md:gap-5 lg:absolute lg:top-5 lg:left-10 lg:mb-0">
        <Icon
          path={mdiKeyboardBackspace}
          size={1.5}
          className="text-accent cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84] md:self-start"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="text-xl font-bold sm:text-2xl">Shopping Cart</h1>
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-2/5 lg:gap-[25px]">
        {cart.map((item, index) => {
          const fruit = FRUITS[item.fruitId];
          return (
            <div
              className="border-secondary flex items-center gap-3 rounded-lg border p-3 lg:gap-[25px] lg:border-none lg:p-0"
              key={fruit.id}
            >
              <Link
                to={`/store/${fruit.slug}`}
                className="group shrink-0 select-none"
              >
                <div className="border-dash shrink-0 rounded-2xl border-2 border-dashed p-6 lg:p-[40px]">
                  <img
                    src={fruit.src}
                    alt={fruit.name}
                    className="size-8 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_15px_#AE9B84] lg:size-[40px]"
                  />
                </div>
              </Link>
              <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-1 lg:gap-2">
                  <h3 className="text-sm font-bold lg:text-base">
                    {fruit.name}
                  </h3>
                  <span className="text-gray text-xs lg:text-sm">
                    {fruit.family} family
                  </span>
                  <div className="text-accent flex gap-1">
                    <Icon
                      path={mdiCubeOutline}
                      size={0.6}
                      className="lg:hidden"
                    />
                    <Icon
                      path={mdiCubeOutline}
                      size={0.8}
                      className="hidden lg:block"
                    />
                    <h4 className="font-mono text-xs font-bold lg:text-sm">
                      In Stock
                    </h4>
                  </div>
                </div>
                <div className="flex items-center justify-between lg:flex-col lg:gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-secondary flex h-6 w-6 items-center justify-center rounded-md p-[5px] transition-all hover:scale-125 lg:h-5 lg:w-5"
                      onClick={() => {
                        setCart((prev) => {
                          const newCart = [...prev];
                          for (let i in newCart)
                            if (newCart[i].fruitId == fruit.id) {
                              if (newCart[i].count == 1) {
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify(newCart),
                                );
                                return newCart;
                              }
                              newCart[i].count -= 1;
                            }
                          localStorage.setItem("cart", JSON.stringify(newCart));
                          return newCart;
                        });
                      }}
                    >
                      <Icon path={mdiMinus} size={0.45} />
                    </button>
                    <span className="flex h-6 w-6 items-center justify-center text-sm font-bold lg:text-base">
                      {item.count}
                    </span>
                    <button
                      className="bg-secondary flex h-6 w-6 items-center justify-center rounded-md p-[5px] transition-all hover:scale-125 lg:h-5 lg:w-5"
                      onClick={() => {
                        setCart((prev) => {
                          const newCart = [...prev];
                          for (let i in newCart)
                            if (newCart[i].fruitId == fruit.id)
                              newCart[i].count += 1;
                          localStorage.setItem("cart", JSON.stringify(newCart));
                          return newCart;
                        });
                      }}
                    >
                      <Icon path={mdiPlus} size={0.45} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      path={mdiTrashCan}
                      size={0.9}
                      color="red"
                      className="bg-secondary cursor-pointer rounded-md p-1 transition-all hover:scale-125 lg:size-[1.1]"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    />
                    <span className="font-mono text-sm font-bold lg:text-base">
                      ${fruit.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {cart.length == 0 && (
          <p className="border-dash text-accent w-fit rounded-2xl border-2 border-dashed p-6 text-center font-mono text-lg lg:p-10 lg:text-xl">
            CART IS EMPTY.
          </p>
        )}
      </div>
      <div className="border-dash flex w-full flex-col gap-4 rounded-2xl border-2 border-dashed p-6 text-white transition-all duration-500 hover:shadow-[0_0_15px_#AE9B84] lg:w-auto lg:gap-[25px] lg:p-9">
        <h2 className="text-xl font-bold lg:text-2xl">Order Summary</h2>
        <div className="border-gray flex flex-col gap-2 border-y-[1px] py-4 font-mono text-sm font-normal text-white lg:py-6 lg:text-base">
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
            <p className="text-accent text-center font-mono text-base lg:text-lg">
              CART IS EMPTY.
            </p>
          )}
        </div>
        <div className="flex justify-between text-lg font-bold lg:text-2xl">
          <div className="flex items-center gap-2">
            <span>Total</span>
            <span className="text-gray text-sm font-normal lg:text-base">
              ({cart.length} Items)
            </span>
          </div>
          <span className="font-mono">${total.toFixed(1)}</span>
        </div>
        <button
          className="bg-accent hover:bg-secondary hover:text-accent flex w-full items-center justify-center gap-3 rounded-xl px-6 py-3 font-mono font-bold text-black transition-all duration-500 hover:shadow-[0_0_10px_#AE9B84] lg:w-[300px] lg:px-24 lg:py-4"
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
            localStorage.setItem("cart", JSON.stringify([]));
          }}
        >
          <Icon path={mdiCheckAll} size={0.8} />
          Checkout
        </button>
      </div>
    </div>
  );
}
