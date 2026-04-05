import { Product, Category } from './types';

export const CONTACT_INFO = {
  email1: "luckboxshop@gmail.com",
  email2: "luckboxshop@gmail.com"
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/your_instagram_account",
  tiktok: "https://tiktok.com/@your_tiktok_account"
};

export const PRODUCTS: Product[] = [
  {
    id: "p14",
    title: {
      en: "Order Packing Video",
      es: "Video de empaquetado del pedido"
    },
    price: 18.00,
    description: {
      en: "If you would like us to post your order packing video on our social media platforms (TikTok/Instagram), please purchase the 'Order Packing Video' product along with your order. This 'Order Packing Video' must be purchased together with other products (e.g., 'Lucky Spoon' or 'Surprise Box') — do not purchase it separately. We restock the 'Order Packing Video' on an irregular basis, usually with about 10 slots available each week. If it shows 'Out of Stock', that means all slots for the current week have been sold out. Additionally, we randomly select 1-2 orders each week (from customers who did not purchase the video) to create surprise packing videos. We sincerely apologize for any inconvenience this may cause! Since video production takes a significant amount of time, we aim to ship each package as quickly as possible while ensuring the quality of both the product and the video. Thank you so much for your support and understanding! 😊",
      es: "Si desea que publiquemos el video de empaquetado de su pedido en nuestras plataformas de redes sociales (TikTok/Instagram), compre el producto 'Video de empaquetado del pedido' junto con su pedido. Este 'Video de empaquetado del pedido' debe comprarse junto con otros productos (por ejemplo, 'Cuchara de la suerte' o 'Caja de Sorpresa'); no lo compre por separado. Reponemos el 'Video de empaquetado del pedido' de forma irregular, generalmente con unos 10 espacios disponibles cada semana. Si muestra 'Agotado', significa que todos los espacios para la semana actual se han agotado. Además, seleccionamos aleatoriamente 1-2 pedidos cada semana (de clientes que no compraron el video) para crear videos de empaquetado sorpresa. ¡Nos disculpamos sinceramente por cualquier inconveniente que esto pueda causar! Dado que la producción de video requiere una cantidad significativa de tiempo, nuestro objetivo es enviar cada paquete lo más rápido posible garantizando la calidad tanto del producto como del video. ¡Muchas gracias por su apoyo y comprensión! 😊"
    },
    images: [
      '/images/14.jpg',
      '/images/14.jpg'
    ],
    tags: [
        { en: "Add-on", es: "Complemento" },
        { en: "Video", es: "Video" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 19
  },
  {
    id: "p15",
    title: {
      en: "Lucky Spoon (All Categories)",
      es: "Cuchara de la Suerte (Todas las Categorías)"
    },
    price: 49.90,
    originalPrice: 79.90,
    description: {
      en: "Lucky Spoon 2.0 — Finally, the Spoon You'll Truly Love! ✨ Lucky Spoon 2.0 is fully upgraded — every item carefully selected to make your heart skip a beat. 💖 Cutest surprises ever: From stationery to accessories, every detail is crafted to delight. 🌟 Uniquely yours: Handpicked treasures designed to match what you really love. 🎁 Top-notch quality: Each piece upgraded for maximum joy and lasting charm. With Lucky Spoon 2.0, you won't just get a spoon — you'll get the one you truly adore, sweeter, cuter, and more magical than ever. One spoon contains approximately 20 items. ✨ Rere will update the items in the Lucky Spoon from time to time — let's look forward to more fun and adorable little goodies together! If you'd like the packing video of your lucky spoon to be posted on our TikTok, please purchase Video of packing your order as well. Creating the video takes effort, and we will ensure the quality of each video. Thank you for your support and understanding! 😊",
      es: "¡Cuchara de la Suerte 2.0 — Finalmente, la cuchara que realmente amarás! ✨ La Cuchara de la Suerte 2.0 está completamente actualizada — cada artículo cuidadosamente seleccionado para hacer que tu corazón se acelere. 💖 Las sorpresas más lindas: Desde papelería hasta accesorios, cada detalle está diseñado para deleitar. 🌟 Únicamente tuyo: Tesoros seleccionados a mano diseñados para coincidir con lo que realmente amas. 🎁 Calidad de primera: Cada pieza actualizada para una alegría máxima y un encanto duradero. Con la Cuchara de la Suerte 2.0, no solo obtendrás una cuchara — obtendrás la que realmente adoras, más dulce, más linda y más mágica que nunca. Una cuchara contiene aproximadamente 20 artículos. ✨ Rere actualizará los artículos de la Cuchara de la Suerte de vez en cuando — ¡esperemos juntos más cosas divertidas y adorables! Si deseas que publiquemos el video de empaquetado de tu cuchara de la suerte en nuestro TikTok, compra también el Video de empaquetado de tu pedido. Crear el video requiere esfuerzo y aseguraremos la calidad de cada video. ¡Gracias por tu apoyo y comprensión! 😊"
    },
    images: [
      '/images/15.jpg',
      '/images/15.jpg'
    ],
    tags: [
        { en: "Popular", es: "Popular" }, 
        { en: "Lucky Spoon", es: "Cuchara de la Suerte" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 20,
    variants: [
      { id: "v1", name: { en: "1 spoon + 1 gift", es: "1 cuchara + 1 regalo" }, price: 49.90 },
      { id: "v2", name: { en: "2 spoons + 2 gifts", es: "2 cucharas + 2 regalos" }, price: 99.80 },
      { id: "v3", name: { en: "3 spoons + 3 gifts & 1 gacha", es: "3 cucharas + 3 regalos y 1 gacha" }, price: 148.90 },
      { id: "v4", name: { en: "5 spoons + 5 gifts & 1 gacha", es: "5 cucharas + 5 regalos y 1 gacha" }, price: 248.90 },
      { id: "v5", name: { en: "6 spoons + 6 gifts & 2 gacha", es: "6 cucharas + 6 regalos y 2 gacha" }, price: 298.90 }
    ]
  },
  {
    id: "p1",
    title: {
      en: "SpongeBob Surprise Box",
      es: "Caja de Sorpresa Bob Esponja"
    },
    price: 79.00,
    originalPrice: 129.00,
    description: {
      en: "A SpongeBob-themed surprise box! Each box includes 15 cute gifts—from cozy plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Bob Esponja! Cada caja incluye 15 regalos lindos: peluches acogedores, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/01.jpg',
      '/images/01.jpg'
    ],
    tags: [
        { en: "Popular", es: "Popular" }, 
        { en: "Storage", es: "Almacenaje" }
    ],
    reviews: 156,
    rating: 5.0,
    inventory: 19
  },

  {
    id: "p8",
    title: {
      en: "Judy Hopps Surprise Box",
      es: "Caja de Sorpresa Judy Hopps"
    },
    price: 79.00,
    description: {
      en: "A Judy Hopps-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Judy Hopps! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/11.jpg',
      '/images/11.jpg'
    ],
    tags: [
        { en: "Disney", es: "Disney" }, 
        { en: "Surprise Box", es: "Caja de Sorpresa" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 19
  },
  {
    id: "p9",
    title: {
      en: "Nick Wilde Surprise Box",
      es: "Caja de Sorpresa Nick Wilde"
    },
    price: 79.00,
    description: {
      en: "A Nick Wilde-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Nick Wilde! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/12.jpg',
      '/images/12.jpg'
    ],
    tags: [
        { en: "Disney", es: "Disney" }, 
        { en: "Surprise Box", es: "Caja de Sorpresa" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 19
  },

  {
    id: "p12",
    title: {
      en: "Doraemon Surprise Box",
      es: "Caja de Sorpresa Doraemon"
    },
    price: 79.00,
    description: {
      en: "A Doraemon-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Doraemon! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/07.jpg',
      '/images/07.jpg'
    ],
    tags: [
      { en: "Anime", es: "Anime" },
      { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 19
  },

  {
    id: "p2",
    title: {
      en: "New Year Surprise Box",
      es: "Caja de Sorpresa de Año Nuevo"
    },
    price: 79.00,
    description: {
      en: "Start the year with a New Year-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to festive surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Empieza el año con una caja de sorpresa temática de Año Nuevo! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de sorpresas festivas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/02.jpg',
      '/images/02.jpg'
    ],
    tags: [
        { en: "New Year", es: "Año Nuevo" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 203,
    rating: 4.9,
    inventory: 19
  },
  {
    id: "p3",
    title: {
      en: "Stitch Surprise Box",
      es: "Caja de Sorpresa Stitch"
    },
    price: 79.00,
    description: {
      en: "A Stitch-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Stitch! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/03.jpg',
      '/images/03.jpg'
    ],
    tags: [
        { en: "Disney", es: "Disney" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 89,
    rating: 4.8,
    inventory: 19
  },
  {
    id: "p4",
    title: {
      en: "Hello Kitty Surprise Box",
      es: "Caja de Sorpresa Hello Kitty"
    },
    price: 79.00,
    description: {
      en: "A Hello Kitty-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Hello Kitty! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/04.jpg',
      '/images/04.jpg'
    ],
    tags: [
        { en: "Sanrio", es: "Sanrio" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 412,
    rating: 4.9,
    inventory: 19
  },
  {
    id: "p5",
    title: {
      en: "Kuromi Surprise Box",
      es: "Caja de Sorpresa Kuromi"
    },
    price: 79.00,
    description: {
      en: "A Kuromi-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Kuromi! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/05.jpg',
      '/images/05.jpg'
    ],
    tags: [
        { en: "Sanrio", es: "Sanrio" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 95,
    rating: 4.7,
    inventory: 19
  },
  {
    id: "p6",
    title: {
      en: "Strawberry Bear Surprise Box",
      es: "Caja de Sorpresa Oso Fresa"
    },
    price: 79.00,
    description: {
      en: "A Strawberry Bear-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Oso Fresa! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/06.jpg',
      '/images/06.jpg'
    ],
    tags: [
        { en: "Disney", es: "Disney" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 110,
    rating: 4.8,
    inventory: 19
  },
  {
    id: "p7",
    title: {
      en: "Cinnamoroll Surprise Box",
      es: "Caja de Sorpresa Cinnamoroll"
    },
    price: 79.00,
    description: {
      en: "A Cinnamoroll-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Cinnamoroll! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/10.jpg',
      '/images/10.jpg'
    ],
    tags: [
        { en: "Sanrio", es: "Sanrio" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 67,
    rating: 4.9,
    inventory: 19
  },
  {
    id: "p10",
    title: {
      en: "Winnie the Pooh Surprise Box",
      es: "Caja de Sorpresa Winnie the Pooh"
    },
    price: 79.00,
    description: {
      en: "A Winnie the Pooh-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Winnie the Pooh! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/13.jpg',
      '/images/13.jpg'
    ],
    tags: [
        { en: "Disney", es: "Disney" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 0,
    rating: 4.9,
    inventory: 19
  },
  {
    id: "p11",
    title: {
      en: "Labubu Surprise Box",
      es: "Caja de Sorpresa Labubu"
    },
    price: 79.00,
    description: {
      en: "A Labubu-themed surprise box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      es: "¡Caja de sorpresa temática de Labubu! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      '/images/09.jpg',
      '/images/09.jpg'
    ],
    tags: [
        { en: "Popular", es: "Popular" }, 
        { en: "Surprise", es: "Sorpresa" }
    ],
    reviews: 0,
    rating: 4.8,
    inventory: 19
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'daily',
    name: { en: 'Daily Life', es: 'Vida Diaria' },
    products: [
      {
        id: 'd1',
        name: { en: 'Sample Product A', es: 'Producto de Ejemplo A' },
        price: 0.0,
        description: { en: 'Placeholder product for category and display demonstration.', es: 'Producto de marcador de posición para demostración de categoría y visualización.' },
        image: '/images/01.jpg'
      },
      {
        id: 'd2',
        name: { en: 'Sample Product B', es: 'Producto de Ejemplo B' },
        price: 0.0,
        description: { en: 'Placeholder product for category and display demonstration.', es: 'Producto de marcador de posición para demostración de categoría y visualización.' },
        image: '/images/02.jpg'
      }
    ]
  },
  {
    id: 'stationery',
    name: { en: 'Stationery', es: 'Papelería' },
    products: [
      {
        id: 's1',
        name: { en: 'Sample Product C', es: 'Producto de Ejemplo C' },
        price: 0.0,
        description: { en: 'Placeholder product for category and display demonstration.', es: 'Producto de marcador de posición para demostración de categoría y visualización.' },
        image: '/images/03.jpg'
      },
      {
        id: 's2',
        name: { en: 'Sample Product D', es: 'Producto de Ejemplo D' },
        price: 0.0,
        description: { en: 'Placeholder product for category and display demonstration.', es: 'Producto de marcador de posición para demostración de categoría y visualización.' },
        image: '/images/04.jpg'
      }
    ]
  }
];
