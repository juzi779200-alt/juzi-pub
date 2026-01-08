import { BankDetails, Product, Category } from './types';

export const CONTACT_INFO = {
  whatsapp: "+86 15884907792",
  email1: "lockboxshop@gmail.com",
  email2: "lockboxshop@gmail.com"
};

export const BANK_INFO: BankDetails = {
  beneficiary: "GUOYA",
  address: "Daliang Village, Guange Town, Qianfeng District, Guang'an City, Sichuan Province",
  city: "Guang'an",
  province: "Sichuan",
  country: "China",
  accountNumber: "6217007200103510130",
  swiftCode: "PCBCCNBJSZX",
  bankName: "China Construction Bank"
};

export const PRODUCTS: Product[] = [
  {
    id: "p14",
    title: {
      en: "Order Packing Video",
      zh: "订单打包视频",
      es: "Video de empaquetado del pedido"
    },
    price: 18.00,
    description: {
      en: "If you would like us to post your order packing video on our social media platforms (TikTok/Instagram), please purchase the 'Order Packing Video' product along with your order. This 'Order Packing Video' must be purchased together with other products (e.g., 'Lucky Spoon' or 'Lucky Box') — do not purchase it separately. We restock the 'Order Packing Video' on an irregular basis, usually with about 10 slots available each week. If it shows 'Out of Stock', that means all slots for the current week have been sold out. Additionally, we randomly select 1-2 orders each week (from customers who did not purchase the video) to create surprise packing videos. We sincerely apologize for any inconvenience this may cause! Since video production takes a significant amount of time, we aim to ship each package as quickly as possible while ensuring the quality of both the product and the video. Thank you so much for your support and understanding! 😊",
      zh: "如果您希望我们在社交媒体平台（TikTok/Instagram）上发布您的订单打包视频，请随订单购买“订单打包视频”产品。此“订单打包视频”必须与其他产品（例如“幸运勺子”或“幸运盒子”）一起购买——请勿单独购买。我们会不定期补货“订单打包视频”，通常每周约有10个名额。如果显示“缺货”，意味着本周的所有名额已售罄。此外，我们会每周随机抽取1-2个订单（从未购买视频的客户中）制作惊喜打包视频。由此给您带来的不便，我们深表歉意！由于视频制作需要大量时间，我们的目标是在确保产品和视频质量的同时尽快发货。非常感谢您的支持和理解！😊",
      es: "Si desea que publiquemos el video de empaquetado de su pedido en nuestras plataformas de redes sociales (TikTok/Instagram), compre el producto 'Video de empaquetado del pedido' junto con su pedido. Este 'Video de empaquetado del pedido' debe comprarse junto con otros productos (por ejemplo, 'Cuchara de la suerte' o 'Caja de la suerte'); no lo compre por separado. Reponemos el 'Video de empaquetado del pedido' de forma irregular, generalmente con unos 10 espacios disponibles cada semana. Si muestra 'Agotado', significa que todos los espacios para la semana actual se han agotado. Además, seleccionamos aleatoriamente 1-2 pedidos cada semana (de clientes que no compraron el video) para crear videos de empaquetado sorpresa. ¡Nos disculpamos sinceramente por cualquier inconveniente que esto pueda causar! Dado que la producción de video requiere una cantidad significativa de tiempo, nuestro objetivo es enviar cada paquete lo más rápido posible garantizando la calidad tanto del producto como del video. ¡Muchas gracias por su apoyo y comprensión! 😊"
    },
    images: [
      new URL('./images/14.jpg', import.meta.url).href,
      new URL('./images/14.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Add-on", zh: "加购", es: "Complemento" },
        { en: "Video", zh: "视频", es: "Video" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 30
  },
  {
    id: "p1",
    title: {
      en: "SpongeBob Lucky Box",
      zh: "海绵宝宝幸运盒子",
      es: "Caja de la Suerte Bob Esponja"
    },
    price: 79.00,
    originalPrice: 129.00,
    description: {
      en: "A SpongeBob-themed surprise lucky box! Each box includes 15 cute gifts—from cozy plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以海绵宝宝为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Bob Esponja! Cada caja incluye 15 regalos lindos: peluches acogedores, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/01.jpg', import.meta.url).href,
      new URL('./images/01.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Popular", zh: "热门", es: "Popular" }, 
        { en: "Storage", zh: "收纳", es: "Almacenaje" }
    ],
    reviews: 156,
    rating: 5.0,
    inventory: 2
  },

  {
    id: "p8",
    title: {
      en: "Judy Hopps Lock Box",
      zh: "朱迪霍普斯 Lock Box",
      es: "Lock Box Judy Hopps"
    },
    price: 89.00,
    description: {
      en: "A Judy Hopps-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以《疯狂动物城》的朱迪霍普斯为主题的幸运盒子，每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Judy Hopps! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/11.jpg', import.meta.url).href,
      new URL('./images/11.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Disney", zh: "迪士尼", es: "Disney" }, 
        { en: "Lock Box", zh: "锁盒", es: "Lock Box" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 3
  },
  {
    id: "p9",
    title: {
      en: "Nick Wilde Lock Box",
      zh: "尼克王尔德 Lock Box",
      es: "Lock Box Nick Wilde"
    },
    price: 89.00,
    description: {
      en: "A Nick Wilde-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以《疯狂动物城》的尼克王尔德为主题的幸运盒子。每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Nick Wilde! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/12.jpg', import.meta.url).href,
      new URL('./images/12.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Disney", zh: "迪士尼", es: "Disney" }, 
        { en: "Luck Box", zh: "锁盒", es: "Luck Box" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 3
  },

  {
    id: "p12",
    title: {
      en: "Doraemon Lucky Box",
      zh: "哆啦A梦幸运盒子",
      es: "Caja de la Suerte Doraemon"
    },
    price: 79.00,
    description: {
      en: "A Doraemon-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以哆啦A梦为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从毛绒、公仔、文具、配饰到暖心的小惊喜一应俱全。每个盒子都独一无二，礼物为随机组合。下单后 5–10 天内发货，送礼或自用都很合适。",
      es: "¡Caja de la suerte sorpresa temática de Doraemon! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/07.jpg', import.meta.url).href,
      new URL('./images/07.jpg', import.meta.url).href
    ],
    tags: [
      { en: "Anime", zh: "动漫", es: "Anime" },
      { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 0,
    rating: 5.0,
    inventory: 0
  },

  {
    id: "p2",
    title: {
      en: "New Year Lucky Box",
      zh: "新年 Lucky Box",
      es: "Caja de la Suerte de Año Nuevo"
    },
    price: 79.00,
    description: {
      en: "Start the year with a New Year-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to festive surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以新年为主幸运盒子，每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Empieza el año con una caja de la suerte temática de Año Nuevo! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de sorpresas festivas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/02.jpg', import.meta.url).href,
      new URL('./images/02.jpg', import.meta.url).href
    ],
    tags: [
        { en: "New Year", zh: "新年", es: "Año Nuevo" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 203,
    rating: 4.9,
    inventory: 0
  },
  {
    id: "p3",
    title: {
      en: "Stitch Lucky Box",
      zh: "史迪奇 Lucky Box",
      es: "Caja de la Suerte Stitch"
    },
    price: 79.00,
    description: {
      en: "A Stitch-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以调皮的史迪奇为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Stitch! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/03.jpg', import.meta.url).href,
      new URL('./images/03.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Disney", zh: "迪士尼", es: "Disney" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 89,
    rating: 4.8,
    inventory: 19
  },
  {
    id: "p4",
    title: {
      en: "Hello Kitty Lucky Box",
      zh: "Hello Kitty Lucky Box",
      es: "Caja de la Suerte Hello Kitty"
    },
    price: 79.00,
    description: {
      en: "A Hello Kitty-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以可爱的 Hello Kitty 为主题的幸运盒子！每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Hello Kitty! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/04.jpg', import.meta.url).href,
      new URL('./images/04.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Sanrio", zh: "三丽鸥", es: "Sanrio" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 412,
    rating: 4.9,
    inventory: 11
  },
  {
    id: "p5",
    title: {
      en: "Kuromi Lucky Box",
      zh: "库洛米 Lucky Box",
      es: "Caja de la Suerte Kuromi"
    },
    price: 79.00,
    description: {
      en: "A Kuromi-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以古灵精怪的库洛米为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Kuromi! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/05.jpg', import.meta.url).href,
      new URL('./images/05.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Sanrio", zh: "三丽鸥", es: "Sanrio" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 95,
    rating: 4.7,
    inventory: 13
  },
  {
    id: "p6",
    title: {
      en: "Strawberry Bear Lucky Box",
      zh: "草莓熊 Lucky Box",
      es: "Caja de la Suerte Oso Fresa"
    },
    price: 79.00,
    description: {
      en: "A Strawberry Bear-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以甜美的草莓熊为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Oso Fresa! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/06.jpg', import.meta.url).href,
      new URL('./images/06.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Disney", zh: "迪士尼", es: "Disney" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 110,
    rating: 4.8,
    inventory: 15
  },
  {
    id: "p7",
    title: {
      en: "Cinnamoroll Lucky Box",
      zh: "玉桂狗幸运盒子",
      es: "Caja de la Suerte Cinnamoroll"
    },
    price: 79.00,
    description: {
      en: "A Cinnamoroll-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以可爱的玉桂狗为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有，每个盒子都独一无二，里面的礼物都是随机的，下单之后就5-10天发货。不管是给自己还是送朋友还是送给自己的孩子，都是一份不错的礼物。",
      es: "¡Caja de la suerte sorpresa temática de Cinnamoroll! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/10.jpg', import.meta.url).href,
      new URL('./images/10.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Sanrio", zh: "三丽鸥", es: "Sanrio" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 67,
    rating: 4.9,
    inventory: 17
  },
  {
    id: "p10",
    title: {
      en: "Winnie the Pooh Lucky Box",
      zh: "小熊维尼 Lucky Box",
      es: "Caja de la Suerte Winnie the Pooh"
    },
    price: 79.00,
    description: {
      en: "A Winnie the Pooh-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to heartwarming surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以小熊维尼为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从舒适的毛绒玩具、文具、配饰到暖心的小惊喜，应有尽有。每个盒子都独一无二，礼物为随机组合。下单后 5–10 天内发货，送礼或自用都很合适。",
      es: "¡Caja de la suerte sorpresa temática de Winnie the Pooh! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/13.jpg', import.meta.url).href,
      new URL('./images/13.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Disney", zh: "迪士尼", es: "Disney" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 0,
    rating: 4.9,
    inventory: 9
  },
  {
    id: "p11",
    title: {
      en: "Labubu Lucky Box",
      zh: "拉布布幸运盒子",
      es: "Caja de la Suerte Labubu"
    },
    price: 79.00,
    description: {
      en: "A Labubu-themed surprise lucky box! Each box includes 15 cute gifts—from plushies, stationery, and accessories to delightful surprises. Every box is unique with random items. Ships within 5–10 days after purchase. Perfect for yourself, friends, or kids.",
      zh: "以拉布布为主题的惊喜幸运盒子！每个盒子都有15个可爱礼物，从毛绒、公仔、文具、配饰到暖心的小惊喜一应俱全。每个盒子都独一无二，礼物为随机组合。下单后 5–10 天内发货，送礼或自用都很合适。",
      es: "¡Caja de la suerte sorpresa temática de Labubu! Cada caja incluye 15 regalos lindos: peluches, papelería y accesorios, además de pequeñas sorpresas. Cada caja es única con artículos aleatorios. Envío dentro de 5–10 días tras la compra. Ideal para ti, tus amigos o niños."
    },
    images: [
      new URL('./images/09.jpg', import.meta.url).href,
      new URL('./images/09.jpg', import.meta.url).href
    ],
    tags: [
        { en: "Popular", zh: "热门", es: "Popular" }, 
        { en: "Lucky", zh: "幸运", es: "Suerte" }
    ],
    reviews: 0,
    rating: 4.8,
    inventory: 5
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'daily',
    name: '日常生活类',
    products: [
      {
        id: 'd1',
        name: '示例商品 A',
        price: 0.0,
        description: '占位商品，用于演示分类与展示。',
        image: new URL('./images/01.jpg', import.meta.url).href
      },
      {
        id: 'd2',
        name: '示例商品 B',
        price: 0.0,
        description: '占位商品，用于演示分类与展示。',
        image: new URL('./images/02.jpg', import.meta.url).href
      }
    ]
  },
  {
    id: 'stationery',
    name: '文具类',
    products: [
      {
        id: 's1',
        name: '示例商品 C',
        price: 0.0,
        description: '占位商品，用于演示分类与展示。',
        image: new URL('./images/03.jpg', import.meta.url).href
      },
      {
        id: 's2',
        name: '示例商品 D',
        price: 0.0,
        description: '占位商品，用于演示分类与展示。',
        image: new URL('./images/04.jpg', import.meta.url).href
      }
    ]
  }
];
