import { logo_icon } from "@/assets/icons";
import type { auth, category, footer, nav, product } from "@/types/constants/pages/index.type";

// Global
const nav: nav = {
     image: {
          src: logo_icon,
          alt: "logo",
          width: 136,
          height: 136,
     },

     dropdown: [
          { id: 1, href: "/category/fruits", title: "Fruits" },
          { id: 2, href: "/category/vegetables", title: "Vegetables" },
     ]

}
const footer: footer = {
     image: {
          src: logo_icon,
          alt: "footer logo",
          width: 136,
     }
}

// Home page
const category: category = {
     title: "Shop by category"
}
const product: product = {
     title: "Our popular products"
}


// Auth page
const auth: auth = {
     title: "Welcome to grocery store 🦑",
     description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.",
     image: {
          src: logo_icon,
          alt: "icon",
          width: 160,
          height: 160,
     },
}


export {
     nav,
     footer,
}
export {
     category,
     product
}

export {
     auth,
}