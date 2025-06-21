import { useEffect } from "react";

export const Close = () => {
  useEffect(() => {
    console.log("snickers");
    window.close();
  }, []);

  return <></>;
};
