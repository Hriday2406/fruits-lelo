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

function getIndex(slug) {
  for (let i = 0; i < 25; i++) if (FRUITS[i].slug == slug) return FRUITS[i].id;
}

export default function Product() {
  let { slug } = useParams();
  let fruit = FRUITS[getIndex(slug)];
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center gap-10 p-20">
      <Icon
        path={mdiKeyboardBackspace}
        size={1.5}
        className="absolute transition-all cursor-pointer text-accent top-5 left-10 hover:scale-125"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="relative p-[180px] border-2 border-dashed border-dash size-[460px] select-none">
        <img src={fruit.src} alt={fruit.name} className="size-[100px]" />
        <Icon
          path={fruit.isFav ? mdiHeart : mdiHeartOutline}
          size={1}
          className="absolute transition-all cursor-pointer bottom-10 left-11 hover:scale-125"
          color={fruit.isFav ? "red" : "white"}
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{fruit.name}</h1>
          <h5 className="text-sm text-gray">{fruit.family} family</h5>
          <div className="flex gap-1 text-accent">
            <Icon path={mdiCubeOutline} size={0.8} />
            <h4 className="font-mono text-sm font-bold">In Stock</h4>
          </div>
          <h5 className="font-mono text-sm font-bold">${fruit.price}</h5>
          <div className="flex gap-2">
            <button className="p-[5px] rounded-md bg-secondary size-5 hover:scale-125 transition-all">
              <Icon path={mdiMinus} size={0.45} />
            </button>
            <span>1</span>
            <button className="p-[5px] rounded-md bg-secondary size-5 hover:scale-125 transition-all">
              <Icon path={mdiPlus} size={0.45} />
            </button>
          </div>
        </div>
        <div className="w-4/5 text-justify">{fruit.desc}</div>
        <div className="flex flex-col gap-3 w-[334px] ">
          <button className="flex justify-center gap-3 px-24 py-4 font-mono font-bold text-black bg-accent rounded-xl">
            <Icon path={mdiCursorDefault} size={1} />
            Buy Now
          </button>
          <button className="flex gap-3 px-24 py-4 font-mono font-bold rounded-xl text-accent bg-secondary">
            <Icon path={mdiCart} size={1} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
