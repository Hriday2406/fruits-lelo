export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <div className="text-center flex flex-col gap-12 items-center">
        <h1 className="font-bold text-4xl">Welcome to Fruits Lelo.</h1>
        <p className="text-xl w-3/5">
          Hamari fresh fruits ki selection ko discover karo, jo flavor aur
          vitality se bharpur hai. Seedha farm se aapke table tak deliver kiya
          jata hai.
        </p>
        <button className="bg-accent py-3 px-6 rounded-xl text-black font-mono font-medium">
          Shop Now
        </button>
      </div>
      <div className=""></div>
    </main>
  );
}
