import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setVisible(y > 300);

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.round((y / maxScroll) * 100) : 100;
      setPercent(pct);
    };

    window.addEventListener("scroll", onScroll);
    // call once to initialize
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/30 transition hover:bg-red-700"
      aria-label={`Scroll to top, ${percent}% scrolled`}
    >
      <div className="flex flex-col items-center">
        <FaArrowUp className="text-xl" />
        <span className="text-[10px] leading-3 mt-1">{percent}%</span>
      </div>
    </button>
  );
}

export default ScrollToTopButton;
