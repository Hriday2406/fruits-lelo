import { FRUITS } from "../utils/constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-20 py-20">
      <div className="flex flex-col items-center gap-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to Fruits Lelo.</h1>
        <p className="w-3/5 text-xl">
          Hamari fresh fruits ki selection ko discover karo, jo flavor aur
          vitality se bharpur hai. Seedha farm se aapke table tak deliver kiya
          jata hai.
        </p>
        <button
          className="rounded-xl bg-accent px-6 py-3 font-mono font-medium text-black transition-all duration-500 hover:bg-bg hover:text-white hover:shadow-[0_0_15px] hover:shadow-accent"
          onClick={() => {
            navigate("/store");
          }}
        >
          Shop Now
        </button>
      </div>
      <div className="w-[810px]">
        <Slider {...settings}>
          {FRUITS.map((fruit, index) => {
            if (index > 5) return;
            return (
              <Link to={`/store/${fruit.slug}`} key={fruit.name}>
                <div className="relative rounded-2xl border-2 border-dashed border-dash p-[75px] transition-all duration-500 hover:shadow-[0_0_20px] hover:shadow-accent">
                  <img
                    src={fruit.src}
                    alt={fruit.name}
                    className="size-[75px]"
                  />
                  <span className="absolute bottom-4 left-4 font-bold">
                    {fruit.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </main>
  );
}
