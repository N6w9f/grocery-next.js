'use server'
import { cookies } from "next/headers";

import axiosClient from "./axios.utility";

import { all_category } from "@/assets/icons";

import { APIBanner } from "@/types/data/banner.type";
import { APICategory } from "@/types/data/categories.type";
import { APIProduct } from "@/types/data/products.type";
import { APITokenUser, APIUser } from "@/types/data/auth.type";

import {
     productsBySearch_and_Category_Catcher,
     bannerCatcher,
     categoryCatcher,
     login_register_catcher,
     productCatcher,
     getCartProductsCatcher,
     add_update_cart_Catcher,
     removeFromCartCatcher,
     addOrderCatcher,
     getOrdersCatcher
} from "@/utilities/catcher";
import { APIAddToCartSchema, APICart, APICartSchema } from "@/types/data/cart.type";
import { failedSchema } from "@/types/data/shared.type";
import { APIOrder, APIOrderSchema, APIProductAndAmount } from "@/types/data/orders.type";

const Cookies = cookies()


const meta = {
     pagination: {
          page: 0,
          pageCount: 0,
          pageSize: 0,
          total: 0,
     }
}


const getBanners = async () => await bannerCatcher(
     async () => {
          const res = await axiosClient.get("/banners?populate=*");
          const data = res.data.data.map((banner: APIBanner) => {
               return {
                    id: banner.id,
                    attributes: {
                         image: {
                              data: {
                                   attributes: {
                                        url: process.env.DATABASE + banner.attributes.image.data.attributes.url,
                                        alternative: banner.attributes.image.data.attributes.alternativeText,
                                        width: banner.attributes.image.data.attributes.width,
                                        height: banner.attributes.image.data.attributes.height,
                                   }
                              }
                         }

                    }
               }
          });
          return {
               status: "success",
               data: data,
               meta: res.data.meta
          }
     }
)

const getCategories = async () => await categoryCatcher(
     async () => {
          const res = await axiosClient.get("/categories?populate=*")
          const all = {
               id: 0,
               attributes: {
                    category: "all",
                    image: {
                         data: {
                              attributes: {
                                   url: all_category,
                                   alternative: "all categories",
                                   width: 500,
                                   height: 500,
                              }
                         }
                    }

               }
          }
          const data = res.data.data.map((category: APICategory) => {
               return {
                    id: category.id,
                    attributes: {
                         category: category.attributes.category,
                         image: {
                              data: {
                                   attributes: {
                                        url: process.env.DATABASE + category.attributes.image.data.attributes.url,
                                        alternative: category.attributes.image.data.attributes.alternativeText || category.attributes.category,
                                        width: category.attributes.image.data.attributes.width,
                                        height: category.attributes.image.data.attributes.height,
                                   }
                              }
                         }

                    }
               }
          });

          return {
               status: "success",
               data: [all, ...data],
               meta: res.data.meta
          }
     }
)
const getProducts = async () => await productCatcher(
     async () => {
          const res = await axiosClient.get("/products?populate=*")
          const data = res.data.data.map((product: APIProduct) => {
               return {
                    id: product.id,
                    attributes: {
                         title: product.attributes.title,
                         description: product.attributes.description,
                         category: product.attributes.category,
                         price: product.attributes.price,
                         discount: product.attributes.discount,
                         quantity: product.attributes.quantity,

                         image: {
                              data: {
                                   attributes: {
                                        url: process.env.DATABASE + product.attributes.image.data.attributes.url,
                                        alternative: product.attributes.image.data.attributes.alternativeText || product.attributes.title,
                                        width: product.attributes.image.data.attributes.width,
                                        height: product.attributes.image.data.attributes.height,
                                   }
                              }
                         }
                    }
               }
          })

          return {
               status: "success",
               data: data,
               meta: res.data.meta
          }
     }
)



// Get by
const getProductsBySearch_and_Category = async (search: string = "all", category: string = "all") => await productsBySearch_and_Category_Catcher(
     async () => {
          const searchFilter = search === "all" ? "" : "filters[$and][0][title][$eqi]=" + search + "&";
          const categoryFilter = category === "all" ? "" : "filters" + (search === "all" ? "" : "[$and][1]") + "[category][category][$eqi]=" + category + "&";
          const filter = searchFilter + categoryFilter + "populate=*";

          const res = await axiosClient.get("/products?" + filter);
          const data: APIProduct[] = res.data.data.map((product: APIProduct): APIProduct => {
               return {
                    id: product.id,
                    attributes: {
                         title: product.attributes.title,
                         description: product.attributes.description,
                         quantity: product.attributes.quantity,
                         price: product.attributes.price,
                         discount: product.attributes.discount,
                         category: {
                              data: {
                                   attributes: {
                                        category: product.attributes.category.data.attributes.category
                                   }
                              }
                         },
                         image: {
                              data: {
                                   attributes: {
                                        url: process.env.DATABASE + product.attributes.image.data.attributes.url,
                                        alternativeText: product.attributes.image.data.attributes.alternativeText,
                                        width: product.attributes.image.data.attributes.width,
                                        height: product.attributes.image.data.attributes.height,
                                   }
                              }
                         },

                    }
               }
          })

          return {
               status: "success",
               data: data,
               meta: res.data.meta

          }
     }
)


// Authentication
const register = async (data: { username: string, email: string, password: string }) => await login_register_catcher(
     async () => {
          const res: APITokenUser = await axiosClient.post("/auth/local/register", data).then(res => res.data);


          return {
               status: "success",
               data: res,
          };
     }
)
const login = async (data: { identifier: string, password: string }) => await login_register_catcher(
     async () => {
          const res: APITokenUser = await axiosClient.post("/auth/local?populate=*", data).then(res => res.data);


          return {
               status: "success",
               data: res,
          };
     }
)



// should be logged in
const getCartProducts = async (user: { id: number, email: string }): Promise<APICartSchema> => await getCartProductsCatcher(
     async () => {
          const res = await axiosClient.get(`user-carts?filters[$and][0][userId][$eq]=${user.id}&filters[$and][1][userEmail][$eq]=${user.email}&populate=deep`)
          const data: APICart[] = res.data.data.map((product: APICart): APICart => {
               return {
                    id: product.id,
                    attributes: {
                         userId: product.attributes.userId,
                         userEmail: product.attributes.userEmail,
                         amount: product.attributes.amount,

                         product: {
                              data: {

                                   id: product.attributes.product.data.id,
                                   attributes: {
                                        title: product.attributes.product.data.attributes.title,
                                        description: product.attributes.product.data.attributes.description,
                                        quantity: product.attributes.product.data.attributes.quantity,
                                        price: product.attributes.product.data.attributes.price,
                                        discount: product.attributes.product.data.attributes.discount,

                                        category: { data: { attributes: { category: product.attributes.product.data.attributes.category.data.attributes.category } } },
                                        image: {
                                             data: {
                                                  attributes: {
                                                       url: process.env.DATABASE + product.attributes.product.data.attributes.image.data.attributes.url,
                                                       alternativeText: product.attributes.product.data.attributes.image.data.attributes.alternativeText,
                                                       width: product.attributes.product.data.attributes.image.data.attributes.width,
                                                       height: product.attributes.product.data.attributes.image.data.attributes.height
                                                  }
                                             }
                                        },

                                        publishedAt: product.attributes.product.data.attributes.publishedAt,
                                        createdAt: product.attributes.product.data.attributes.createdAt,
                                        updatedAt: product.attributes.product.data.attributes.updatedAt,
                                   }
                              }
                         },

                         publishedAt: product.attributes.publishedAt,
                         createdAt: product.attributes.createdAt,
                         updatedAt: product.attributes.updatedAt,
                    }
               }
          })

          return {
               status: "success",
               data: data,
               meta: res.data.meta
          }
     }
)




const addToCart = async (props: { userId: number, userEmail: string, amount: number, product: APIProduct }): Promise<APIAddToCartSchema> => await add_update_cart_Catcher(
     async () => {
          const res: APICart = await axiosClient.post("/user-carts?populate=deep", {
               data: {
                    userId: props.userId,
                    userEmail: props.userEmail,
                    amount: props.amount,
                    product: props.product,

               }
          }).then(res => res.data.data);

          const data = {
               id: res.id,
               attributes: {
                    userId: res.attributes.userId,
                    userEmail: res.attributes.userEmail,
                    amount: res.attributes.amount,

                    product: {
                         data: {

                              id: res.attributes.product.data.id,
                              attributes: {
                                   title: res.attributes.product.data.attributes.title,
                                   description: res.attributes.product.data.attributes.description,
                                   quantity: res.attributes.product.data.attributes.quantity,
                                   price: res.attributes.product.data.attributes.price,
                                   discount: res.attributes.product.data.attributes.discount,

                                   category: { data: { attributes: { category: res.attributes.product.data.attributes.category.data.attributes.category } } },
                                   image: {
                                        data: {
                                             attributes: {
                                                  url: process.env.DATABASE + res.attributes.product.data.attributes.image.data.attributes.url,
                                                  alternativeText: res.attributes.product.data.attributes.image.data.attributes.alternativeText,
                                                  width: res.attributes.product.data.attributes.image.data.attributes.width,
                                                  height: res.attributes.product.data.attributes.image.data.attributes.height
                                             }
                                        }
                                   },

                                   publishedAt: res.attributes.product.data.attributes.publishedAt,
                                   createdAt: res.attributes.product.data.attributes.createdAt,
                                   updatedAt: res.attributes.product.data.attributes.updatedAt,
                              }
                         }
                    },

                    publishedAt: res.attributes.publishedAt,
                    createdAt: res.attributes.createdAt,
                    updatedAt: res.attributes.updatedAt,
               }
          }



          return {
               status: "success",
               data: data
          }
     }
)

const removeFromCart = async (id: number): Promise<{ status: "success" } | failedSchema> => await removeFromCartCatcher(
     async () => {
          await axiosClient.delete("/user-carts/" + id)

          return {
               status: "success"
          }
     }
)




// Order
const getOrders = async ({ userId, userEmail }: { userId: number, userEmail: string, }) => await getOrdersCatcher(
     async () => {
          const res = await axiosClient.get(`/orders?filters[$and][0][userId][$eq]=${userId}&filters[$and][1][userEmail][$eq]=${userEmail}&populate=deep,5`)
          const data: APIOrder[] = res.data.data.map((order: APIOrder): APIOrder => ({
               id: order.id,
               attributes: {
                    userId: order.attributes.userId,
                    userEmail: order.attributes.userEmail,
                    zip: order.attributes.zip,
                    address: order.attributes.address,
                    total: order.attributes.total,
                    phone: order.attributes.phone,
                    productAndAmount: order.attributes.productAndAmount.map((product: APIProductAndAmount): APIProductAndAmount => {
                         return {
                              id: product.id,
                              amount: product.amount,
                              product: {
                                   data: {

                                        id: product.product.data.id,
                                        attributes: {
                                             title: product.product.data.attributes.title,
                                             description: product.product.data.attributes.description,
                                             quantity: product.product.data.attributes.quantity,
                                             price: product.product.data.attributes.price,
                                             discount: product.product.data.attributes.discount,
                                             category: { data: { attributes: { category: product.product.data.attributes.category.data.attributes.category } } },
                                             image: {
                                                  data: {
                                                       attributes: {
                                                            url: process.env.DATABASE + product.product.data.attributes.image.data.attributes.url,
                                                            alternativeText: product.product.data.attributes.image.data.attributes.alternativeText,
                                                            width: product.product.data.attributes.image.data.attributes.width,
                                                            height: product.product.data.attributes.image.data.attributes.height,
                                                       }
                                                  }
                                             }

                                        }
                                   }
                              }

                         }
                    }),
                    createdAt: order.attributes.createdAt

               }
          }))

          return {
               status: "success",
               data,
               meta: res.data.meta
          }

     }
);

type addOrderT = {
     userId: number,
     userEmail: string,
     zip: string,
     address: string,
     phone: string,
     total: number,
     productAndAmount: {
          amount: number,
          product: APIProduct
     }[]
}
const addOrder = async ({ userId, userEmail, zip, address, phone, total, productAndAmount }: addOrderT): Promise<APIOrderSchema> => await addOrderCatcher(
     async () => {
          const res = await axiosClient.post('/orders?populate=deep,5', {
               data: {
                    userId: userId,
                    userEmail: userEmail,
                    zip: zip,
                    address: address,
                    phone: phone,
                    total: total,
                    productAndAmount: productAndAmount
               }
          });


          return {
               status: "success",
               data: res.data.data,
               meta: res.data.meta,
          }
     }
)

















export {
     getBanners, getCategories, getProducts,


     // Get by
     getProductsBySearch_and_Category,


     // Auth
     register, login,


     // should be logged in
     getCartProducts, addToCart, removeFromCart,

     // orders
     getOrders,
     addOrder

}