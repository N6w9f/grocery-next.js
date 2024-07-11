import { StaticImport } from "next/dist/shared/lib/get-img-props";

// local
type image = {
     src: StaticImport | string,
     alt?: string,
     width?: number,
     height?: number,
     className?: string
}


export type { image };
