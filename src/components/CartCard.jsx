import { FRUITS } from "../utils/constants";
import Icon from "@mdi/react";
import { mdiCart, mdiCheckAll, mdiTrashCan } from "@mdi/js";
import { useNavigate } from "react-router";

export default function CartCard() {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border-2 border-dashed border-dash px-9 py-9 text-white shadow-[0_0_15px_#AE9B84]">
      <h2 className="border-b-[1px] border-gray pb-6 text-2xl font-bold">
        Shopping Cart
      </h2>
      <div className="flex flex-col gap-[25px] py-12">
        {FRUITS.map((fruit, index) => {
          if (index > 1) return;
          return (
            <div className="flex items-center gap-[25px]" key={fruit.id}>
              <div className="shrink-0 rounded-2xl border-2 border-dashed border-dash p-[25px]">
                <img src={fruit.src} alt={fruit.name} className="size-[25px]" />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col justify-between">
                  <h3 className="font-bold">{fruit.name}</h3>
                  <span className="text-gray">{fruit.family}</span>
                  <span className="text-gray">Qty: 5</span>
                </div>
                <div className="flex h-full items-center gap-5 font-mono font-bold">
                  <Icon
                    path={mdiTrashCan}
                    size={1.1}
                    color="red"
                    className="cursor-pointer rounded-md bg-secondary p-1 transition-all hover:scale-125"
                  />
                  <span>${fruit.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between border-t-[1px] border-gray py-6 font-mono text-2xl font-bold">
        <span>Total</span>
        <span>$19.5</span>
      </div>
      <div className="flex w-[380px] flex-col gap-3">
        <button
          className="flex items-center justify-center gap-3 rounded-xl bg-accent px-24 py-4 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84]"
          onClick={() => {
            alert(
              "Yay! You have bought the fruits! It will be delivered to you.",
            );
          }}
        >
          <Icon path={mdiCheckAll} size={0.8} />
          Checkout
        </button>
        <button
          className="flex items-center justify-center gap-3 rounded-xl bg-secondary px-24 py-4 font-mono font-bold text-accent transition-all duration-500 hover:bg-accent hover:text-black hover:shadow-[0_0_10px] hover:shadow-accent"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <Icon path={mdiCart} size={0.8} />
          See in Cart
        </button>
      </div>
    </div>
  );
}
