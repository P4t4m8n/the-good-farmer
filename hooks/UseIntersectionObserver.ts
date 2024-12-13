import { useEffect } from "react";

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLDivElement | null>,
  dependencies: unknown[],
  callback: () => void
) => {
  useEffect(() => {
    const target = ref.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);
};
