import { useEffect, useState, useRef } from "react";

export default function Popup({
  visible,
  type = "info",
  title,
  message,
  onClose,
}) {
  const [entered, setEntered] = useState(false);
  const enterTimerRef = useRef(null);
  const autoTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const startRef = useRef(0);
  const remainingRef = useRef(4500);

  const clearAllTimers = () => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => {
    clearAllTimers();
    if (visible) {
      // trigger entrance animation
      enterTimerRef.current = setTimeout(() => setEntered(true), 10);
      // start auto-dismiss countdown
      remainingRef.current = 4500;
      startRef.current = Date.now();
      autoTimerRef.current = setTimeout(() => {
        setEntered(false);
        // small delay for exit animation before calling onClose
        closeTimerRef.current = setTimeout(() => onClose?.(), 220);
        autoTimerRef.current = null;
      }, remainingRef.current);
    } else {
      setEntered(false);
    }

    return () => {
      clearAllTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible && !entered) return null;

  const bg =
    type === "success"
      ? "bg-green-600"
      : type === "error"
        ? "bg-red-600"
        : "bg-gray-800";

  function handleMouseEnter() {
    // pause the auto-dismiss
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
      const elapsed = Date.now() - startRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    }
    // if close timer is pending (we were mid-exit), cancel it and re-enter
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      setEntered(true);
      // restart countdown fresh
      remainingRef.current = 4500;
      startRef.current = Date.now();
      autoTimerRef.current = setTimeout(() => {
        setEntered(false);
        closeTimerRef.current = setTimeout(() => onClose?.(), 220);
        autoTimerRef.current = null;
      }, remainingRef.current);
    }
  }

  function handleMouseLeave() {
    // resume countdown
    if (!autoTimerRef.current && remainingRef.current > 0) {
      startRef.current = Date.now();
      autoTimerRef.current = setTimeout(() => {
        setEntered(false);
        closeTimerRef.current = setTimeout(() => onClose?.(), 220);
        autoTimerRef.current = null;
      }, remainingRef.current);
    }
  }

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`border-dash bg-bg/80 fixed top-6 left-1/2 z-50 max-w-md -translate-x-1/2 transform rounded-2xl border-2 border-dashed p-6 text-white shadow-[0_10px_30px_rgba(174,155,132,0.12),0_0_40px_rgba(174,155,132,0.06)] backdrop-blur-sm transition-all duration-220 ease-out ${entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-secondary"}`}
          aria-hidden
        >
          {/* small icon circle */}
        </div>
        <div className="flex-1">
          <div className="font-mono text-lg font-bold">{title}</div>
          <div className="text-gray mt-1 text-sm">{message}</div>
        </div>
        <button
          aria-label="Close popup"
          className={`ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 font-mono text-lg font-bold shadow-[0_0_10px_rgba(0,0,0,0.35)] ${type === "success" ? "text-green-600 drop-shadow-[0_0_10px_green]" : type === "error" ? "text-red-600 drop-shadow-[0_0_10px_red]" : "#1f1f1f"} cursor-pointer transition-all duration-150 hover:scale-110`}
          onClick={() => {
            clearAllTimers();
            setEntered(false);
            setTimeout(() => onClose?.(), 180);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
