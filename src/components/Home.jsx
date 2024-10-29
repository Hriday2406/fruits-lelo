import { FRUITS } from "../utils/constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderArrows() {
  return null;
}

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    pauseOnHover: true,
    variableWidth: true,
    nextArrow: <SliderArrows />,
    prevArrow: <SliderArrows />,
  };
  return (
    <main className="flex flex-col items-center justify-center h-full gap-20 py-20">
      <div className="flex flex-col items-center gap-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to Fruits Lelo.</h1>
        <p className="w-3/5 text-xl">
          Hamari fresh fruits ki selection ko discover karo, jo flavor aur
          vitality se bharpur hai. Seedha farm se aapke table tak deliver kiya
          jata hai.
        </p>
        <button className="px-6 py-3 font-mono font-medium text-black bg-accent rounded-xl">
          Shop Now
        </button>
      </div>
      <div className="w-[775px]">
        <Slider {...settings}>
          {FRUITS.map((fruit) => (
            <div
              className="relative p-[75px] border-2 border-dashed size-[229px] border-dash rounded-2xl"
              key={fruit.name}
            >
              <img src={fruit.src} alt={fruit.name} className="size-[75px]" />
              <span className="absolute font-bold left-4 bottom-4">
                {fruit.name}
              </span>
            </div>
          ))}
        </Slider>
      </div>
    </main>
  );
}
