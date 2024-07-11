'use clint'
import { useState, useEffect } from "react";

export function useWindowSize() {
     type windowSizeSchema = {
          width: number | undefined,
          height: number | undefined,
     }
     const [windowSize, setWindowSize] = useState<windowSizeSchema>({
          width: undefined,
          height: undefined,
     });


     useEffect(() => {
          window.addEventListener("resize", handleResize);

          handleResize();
          function handleResize() {
               setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
               });
          }




          return () => window.removeEventListener("resize", handleResize);
     }, []);
     return windowSize;
}