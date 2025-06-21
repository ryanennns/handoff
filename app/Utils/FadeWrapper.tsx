import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  activeKey: string;
}

export const FadeWrapper = ({ children, activeKey }: Props) => {
  const [displayedKey, setDisplayedKey] = useState(activeKey);
  const [renderedChildren, setRenderedChildren] = useState(children);
  const [fadeState, setFadeState] = useState("fade-in");

  useEffect(() => {
    if (activeKey !== displayedKey) {
      setFadeState("fade-out");
      const timeout = setTimeout(() => {
        setDisplayedKey(activeKey);
        setRenderedChildren(children); // update after fade-out
        setFadeState("fade-in");
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [activeKey, displayedKey, children]);

  return (
    <div
      className={`transition-opacity duration-200 ${
        fadeState === "fade-in" ? "opacity-100" : "opacity-0"
      }`}
    >
      {renderedChildren}
    </div>
  );
};
