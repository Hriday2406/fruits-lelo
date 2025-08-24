import { FRUITS, FRUITS_BY_ID } from "../utils/constants";
import Icon from "@mdi/react";
import { mdiCart, mdiCheckAll, mdiTrashCan } from "@mdi/js";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./App";

export default function CartCard({ onNotify }) {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cart.length; i++) {
      const f = FRUITS_BY_ID[cart[i].fruitId] || FRUITS[cart[i].fruitId];
      temp += Number(f?.price || 0) * cart[i].count;
    }
    setTotal(temp);
  }, [cart]);

  function handleDelete(index) {
    setCart((prev) => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  }

  return (
    <div className="border-dash bg-bg/80 overflow-hidden rounded-2xl border-2 border-dashed p-9 text-white shadow-[0_10px_30px_rgba(174,155,132,0.12),0_0_40px_rgba(174,155,132,0.06)] backdrop-blur-sm">
      <h2 className="border-gray border-b-[1px] pb-6 text-2xl font-bold">
        Shopping Cart
      </h2>
      <div className="scrollbar-thin scrollbar-webkit flex max-h-[362px] flex-col gap-[25px] overflow-y-auto py-9 pr-5">
        {cart.map((item, index) => {
          const fruit = FRUITS_BY_ID[item.fruitId] || FRUITS[item.fruitId];

          return (
            <div className="flex items-center gap-[25px]" key={fruit.id}>
              <div className="border-dash shrink-0 rounded-2xl border-2 border-dashed p-[25px]">
                <img src={fruit.src} alt={fruit.name} className="size-[25px]" />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex w-2/5 items-center justify-between">
                  <div className="flex flex-col justify-between">
                    <h3 className="font-bold">{fruit.name}</h3>
                    <span className="text-gray">{fruit.family}</span>
                    <span className="text-gray">Qty: {item.count}</span>
                  </div>
                  <Icon
                    path={mdiTrashCan}
                    size={1.1}
                    color="red"
                    className="bg-secondary cursor-pointer rounded-md p-1 transition-all hover:scale-125"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  />
                </div>
                <div className="flex h-full items-center gap-5 font-mono font-bold">
                  <span>
                    ${fruit.price} x {item.count} = $
                    {(fruit.price * item.count).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {cart.length == 0 && (
          <p className="text-accent text-center font-mono text-lg">
            CART IS EMPTY.
          </p>
        )}
      </div>
      <div className="border-gray flex justify-between border-t-[1px] py-6 font-mono text-2xl font-bold">
        <span>Total</span>
        <span>${total.toFixed(1)}</span>
      </div>
      <div className="flex w-[415px] flex-col gap-3">
        <button
          className="bg-accent hover:bg-secondary hover:text-accent flex cursor-pointer items-center justify-center gap-3 rounded-xl px-24 py-4 font-mono font-bold text-black transition-all duration-500 hover:shadow-[0_0_10px_#AE9B84]"
          onClick={() => {
            if (cart.length == 0) {
              if (onNotify) {
                onNotify({
                  visible: true,
                  type: "error",
                  title: "Cart khaali hai",
                  message:
                    "Kuch phalon ko cart mein daalo, tabhi checkout kar paoge.",
                });
              } else {
                alert(
                  "You cannot checkout with an empty cart, put some fruits in the cart first.",
                );
              }
              return;
            }

            if (onNotify) {
              onNotify({
                visible: true,
                type: "success",
                title: "Order pakka hua",
                message: `Yay! Aapke phal order ho gaye hain — jaldi hi deliver ho jayenge! Total: $${total.toFixed(
                  1,
                )}`,
              });
            } else {
              alert(
                `Yay! You have bought the fruits! It will be delivered to you. Total: $${total.toFixed(
                  1,
                )}`,
              );
            }
            setCart([]);
            localStorage.setItem("cart", JSON.stringify([]));
          }}
        >
          <Icon path={mdiCheckAll} size={0.8} />
          Checkout
        </button>
        <button
          className="bg-secondary text-accent hover:bg-accent hover:shadow-accent flex cursor-pointer items-center justify-center gap-3 rounded-xl px-24 py-4 font-mono font-bold transition-all duration-500 hover:text-black hover:shadow-[0_0_10px]"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <Icon path={mdiCart} size={0.8} />
          Open Cart
        </button>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  onNotify: PropTypes.func,
};
