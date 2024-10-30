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
      <div className="relative shrink-0 select-none border-2 border-dashed border-dash p-[180px]">
        <img src={fruit.src} alt={fruit.name} className="size-[100px]" />
        <Icon
          path={fruit.isFav ? mdiHeart : mdiHeartOutline}
          size={1}
          className="absolute right-10 top-10 cursor-pointer transition-all duration-500 hover:scale-125 hover:drop-shadow-[0_0_15px_red]"
          color={fruit.isFav ? "red" : "white"}
        />
        <div className="absolute -bottom-10 left-0 flex items-center gap-2">
          {fruit.colors.map((color) => (
            <Tags text={color} isVitamin={false} key={fruit.id} />
          ))}
          {fruit.vitamins.map((vitamin) => (
            <Tags text={vitamin} isVitamin={true} key={fruit.id} />
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
            <button className="size-5 rounded-md bg-secondary p-[5px] transition-all hover:scale-125">
              <Icon path={mdiMinus} size={0.45} />
            </button>
            <span>1</span>
            <button className="size-5 rounded-md bg-secondary p-[5px] transition-all hover:scale-125">
              <Icon path={mdiPlus} size={0.45} />
            </button>
          </div>
        </div>
        <div className="w-3/5 text-justify">{fruit.desc}</div>
        <div className="flex w-[334px] flex-col gap-3">
          <button className="flex justify-center gap-3 rounded-xl bg-accent px-24 py-4 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84]">
            <Icon path={mdiCursorDefault} size={1} />
            Buy Now
          </button>
          <button className="flex gap-3 rounded-xl bg-secondary px-24 py-4 font-mono font-bold text-accent transition-all duration-500 hover:bg-accent hover:text-black hover:shadow-[0_0_10px] hover:shadow-accent">
            <Icon path={mdiCart} size={1} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
