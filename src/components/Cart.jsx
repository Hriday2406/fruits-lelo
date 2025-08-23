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
import Popup from "./Popup";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    visible: false,
    type: "info",
    title: "",
    message: "",
  });

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
    <div className="relative flex items-start justify-between px-14 py-32">
      <div className="absolute top-5 left-10">
        <Icon
          path={mdiKeyboardBackspace}
          size={1.5}
          className="text-accent cursor-pointer transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#AE9B84]"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="pt-3 pl-4 text-2xl font-bold">Shopping Cart</h1>
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
                <div className="border-dash shrink-0 rounded-2xl border-2 border-dashed p-[40px]">
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
                  <div className="text-accent flex gap-1">
                    <Icon path={mdiCubeOutline} size={0.8} />
                    <h4 className="font-mono text-sm font-bold">In Stock</h4>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-secondary size-5 rounded-md p-[5px] transition-all hover:scale-125"
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
                  <span>{item.count}</span>
                  <button
                    className="bg-secondary size-5 rounded-md p-[5px] transition-all hover:scale-125"
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
                <Icon
                  path={mdiTrashCan}
                  size={1.1}
                  color="red"
                  className="bg-secondary cursor-pointer rounded-md p-1 transition-all hover:scale-125"
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
          <p className="border-dash text-accent w-fit rounded-2xl border-2 border-dashed p-10 font-mono text-xl">
            CART IS EMPTY.
          </p>
        )}
      </div>
      <div className="border-dash flex flex-col gap-[25px] rounded-2xl border-2 border-dashed p-9 text-white transition-all duration-500 hover:shadow-[0_0_15px_#AE9B84]">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <div className="border-gray flex flex-col gap-2 border-y-[1px] py-6 font-mono font-normal text-white">
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
            <p className="text-accent text-center font-mono text-lg">
              CART IS EMPTY.
            </p>
          )}
        </div>
        <div className="flex justify-between text-2xl font-bold">
          <div className="flex items-center gap-2">
            <span>Total</span>
            <span className="text-gray text-base font-normal">
              ({cart.length} Items)
            </span>
          </div>
          <span className="font-mono">${total.toFixed(1)}</span>
        </div>
        <button
          className="bg-accent hover:bg-secondary hover:text-accent flex w-[300px] items-center justify-center gap-3 rounded-xl px-24 py-4 font-mono font-bold text-black transition-all duration-500 hover:shadow-[0_0_10px_#AE9B84]"
          onClick={() => {
            if (cart.length == 0) {
              setPopup({
                visible: true,
                type: "error",
                title: "Cart khaali hai",
                message:
                  "Kuch phalon ko cart mein daalo, tabhi checkout kar paoge.",
              });
              return;
            }

            setPopup({
              visible: true,
              type: "success",
              title: "Order pakka hua",
              message:
                "Yay! Aapke phal order ho gaye hain — jaldi hi deliver ho jayenge!",
            });
            setCart([]);
            localStorage.setItem("cart", JSON.stringify([]));
          }}
        >
          <Icon path={mdiCheckAll} size={0.8} />
          Checkout
        </button>
        <Popup
          visible={popup.visible}
          type={popup.type}
          title={popup.title}
          message={popup.message}
          onClose={() => setPopup((p) => ({ ...p, visible: false }))}
        />
      </div>
    </div>
  );
}
