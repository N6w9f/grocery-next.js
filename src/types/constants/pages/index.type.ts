import type { image } from "../global.type"

// Global
type nav = {
     image: image,
     dropdown: { id: number, href: string, title: string }[]
}
type footer = {
     image: image,
}

// Home page
type category = {
     title: string,
}
type product = {
     title: string
}

// Auth page
type auth = {
     title: string,
     description: string,
     image: image
}


export type {
     nav,
     footer,
}

export type {
     category,
     product,
}

export type {
     auth,
}