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
    speed: 500,
    autoplay: false,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    pauseOnHover: true,
    variableWidth: false,
    nextArrow: <SliderArrows />,
    prevArrow: <SliderArrows />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  };
  const navigate = useNavigate();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-12 px-4 py-12 sm:gap-20 sm:py-20">
      <div className="flex flex-col items-center gap-8 text-center sm:gap-12">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Welcome to Fruits Lelo.
        </h1>
        <p className="w-4/5 text-base sm:w-3/5 sm:text-lg lg:text-xl">
          Hamari fresh fruits ki selection ko discover karo, jo flavor aur
          vitality se bharpur hai. Seedha farm se aapke table tak deliver kiya
          jata hai.
        </p>
        <button
          className="bg-accent hover:bg-bg hover:shadow-accent rounded-xl px-6 py-3 font-mono font-medium text-black transition-all duration-500 hover:text-white hover:shadow-[0_0_15px]"
          onClick={() => {
            navigate("/store");
          }}
        >
          Shop Now
        </button>
      </div>
      <div className="w-full max-w-[350px] md:max-w-[700px]">
        <Slider {...settings}>
          {FRUITS.map((fruit, index) => {
            if (index > 5) return;
            return (
              <Link to={`/store/${fruit.slug}`} key={fruit.name}>
                <div className="group border-dash relative mx-1 rounded-2xl border-2 border-dashed p-8 md:mx-2 md:p-12 md:pb-12">
                  <img
                    src={fruit.src}
                    alt={fruit.name}
                    loading="lazy"
                    className="mx-auto size-14 shrink-0 object-contain transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_#AE9B84] md:size-20"
                  />
                  <span className="absolute bottom-2 left-2 text-xs font-bold sm:bottom-3 sm:left-3 sm:text-sm lg:bottom-4 lg:left-4 lg:text-base">
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
