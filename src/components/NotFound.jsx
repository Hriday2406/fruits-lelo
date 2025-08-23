import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiKeyboardBackspace, mdiMagnify } from "@mdi/js";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-20 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold text-accent">404</h1>
        <h2 className="text-2xl font-bold">Fruit Not Found</h2>
        <p className="text-gray-400 max-w-md">
          The fruit you&apos;re looking for doesn&apos;t exist in our collection. 
          It might have been removed or the URL is incorrect.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/store"
          className="flex items-center gap-3 rounded-xl bg-accent px-6 py-3 font-mono font-bold text-black transition-all duration-500 hover:bg-secondary hover:text-accent hover:shadow-[0_0_10px_#AE9B84]"
        >
          <Icon path={mdiMagnify} size={1} />
          Browse All Fruits
        </Link>
        
        <Link 
          to="/"
          className="flex items-center gap-3 rounded-xl bg-secondary px-6 py-3 font-mono font-bold text-accent transition-all duration-500 hover:bg-accent hover:text-black hover:shadow-[0_0_10px] hover:shadow-accent"
        >
          <Icon path={mdiKeyboardBackspace} size={1} />
          Go Home
        </Link>
      </div>
    </div>
  );
}