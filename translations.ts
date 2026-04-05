import { Language } from './types';

export const translations = {
  en: {
    nav: {
      home: "Home",
      all: "All Products",
      about: "About",
      contact: "Contact",
      track: "Track Order",
      faq: "FAQ",
      shipping: "Shipping",
      returns: "Returns",
      brandName: "luckboxshop"
    },
    hero: {
      newCollection: "New Collection",
      title: "Cute & Chaos",
      subtitle: "Surprise Boxes",
      description: "Discover our viral storage cases and signature Surprise Boxes. Direct payment available for fee-free shopping.",
      cta: "Start Exploring"
    },
    home: {
      trending: "Trending Items",
      items: "items"
    },
    product: {
      back: "Back to Scoops",
      reviews: "reviews",
      sale: "SALE",
      viewDetails: "View Details",
      price: "Price",
      buyerProtection: "Buyer Protection",
      fastShipping: "Fast Shipping",
      securePayment: "Secure Payment",
      howToPurchase: "How to Purchase",
      payApple: "Pay with Apple Pay",
      tip: "You can pay directly via Bank Transfer below, or use PayPal for secure payment.",
      applePayModal: {
        title: "Pay with Apple Pay",
        desc: "Apple Pay is currently not available. Please use PayPal or Bank Transfer for payment.",
        cancel: "Cancel",
        chat: "Close"
      }
    },
    bank: {
      title: "Payment Information",
      subtitle: "Please use the following details to complete your bank transfer.",
      beneficiary: "Beneficiary",
      bankName: "Bank Name",
      accountNo: "Account No.",
      swift: "SWIFT / BIC",
      country: "Country",
      province: "Province",
      city: "City",
      fullAddress: "Full Address",
      footer: "Please include your order reference number in the transfer description.",
      copy: "Copy"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Have questions about your order or our boxes?",
      getInTouch: "Get in Touch",
      emailSupport: "Email Support",
      location: "Location",
      hours: "Working Hours",
      form: {
        name: "Name",
        email: "Email",
        orderNo: "Order Number (Optional)",
        message: "Message",
        send: "Send Message",
        sentTitle: "Message Sent!",
        sentDesc: "Thank you for reaching out. Our support team will get back to you within 24 hours.",
        returnHome: "Return Home"
      }
    },
    about: {
      title: "About Us",
      content: [
        "Welcome to luckboxshop, your ultimate destination for cute stationery, surprise boxes, and collectible treasures!",
        "Founded with a passion for all things kawaii, we strive to bring joy to your doorstep with our carefully curated selection of items. Whether you are looking for the latest character accessories or the thrill of a blind scoop, we have something special for you.",
        "We are a small, dedicated team sourcing directly from manufacturers to ensure authenticity and the best prices. Our 'Surprise Boxes' have gone viral for their generosity and variety, making every unboxing experience a surprise party."
      ],
      promiseTitle: "Our Promise",
      promises: [
        "Careful packaging and accurate delivery."
      ]
    },
    shipping: {
      title: "Shipping Information",
      intro: "Hello everyone! We've recently added some new countries to our shipping list. Below is the full list of countries we currently ship to. To ensure every package arrives safely and smoothly, we work with reliable carriers. As a result, some destinations have important notes—please read them carefully! If your country can easily receive international parcels but isn't on the list yet, please let me know. Thank you!",
      regions: {
        northAmerica: {
          title: "North America",
          countries: [
            { name: "United States 🇺🇸", note: "" },
            { name: "Canada 🇨🇦", note: "We do not accept bulk orders. Each order can include up to 2 Lucky Spoon or 2 Surprise Box only. The recipient's full name must be provided; abbreviations or only a first or last name are not allowed. In addition, for the same recipient, only one order per week is accepted. Please note that it is strictly prohibited to use company, warehouse, hotel, restaurant, or any other commercial institution name as the recipient. Names containing terms such as \"Inc.\", \"LTD\", or \"Corporation\" are not allowed." },
            { name: "Mexico 🇲🇽", note: "" }
          ]
        },
        europe: {
          title: "Europe",
          countries: [
            { name: "France 🇫🇷", note: "" },
            { name: "United Kingdom 🇬🇧", note: "" },
            { name: "Germany 🇩🇪", note: "" },
            { name: "Italy 🇮🇹", note: "" },
            { name: "Spain 🇪🇸", note: "" },
            { name: "Netherlands 🇳🇱", note: "" },
            { name: "Belgium 🇧🇪", note: "" },
            { name: "Austria 🇦🇹", note: "" },
            { name: "Czech Republic 🇨🇿", note: "" },
            { name: "Romania 🇷🇴", note: "" },
            { name: "Slovakia 🇸🇰", note: "" },
            { name: "Hungary 🇭🇺", note: "" },
            { name: "Norway 🇳🇴", note: "" },
            { name: "Luxembourg 🇱🇺", note: "" },
            { name: "Cyprus 🇨🇾", note: "" },
            { name: "Bulgaria 🇧🇬", note: "" },
            { name: "Croatia 🇭🇷", note: "" },
            { name: "Sweden 🇸🇪", note: "Some carriers only offer delivery via pick-up (pick-up points or lockers). Recipients must provide accurate and complete contact information to avoid delivery failure." },
            { name: "Denmark 🇩🇰", note: "Some carriers only offer delivery via pick-up (pick-up points or lockers). Recipients must provide accurate and complete contact information to avoid delivery failure." },
            { name: "Finland 🇫🇮", note: "Some carriers only offer delivery via pick-up (pick-up points or lockers). Recipients must provide accurate and complete contact information to avoid delivery failure." },
            { name: "Estonia 🇪🇪", note: "Some carriers only offer delivery via pick-up (pick-up points or lockers). Recipients must provide accurate and complete contact information to avoid delivery failure." },
            { name: "Latvia 🇱🇻", note: "Some carriers only offer delivery via pick-up (pick-up points or lockers). Recipients must provide accurate and complete contact information to avoid delivery failure." },
            { name: "Lithuania 🇱🇹", note: "Some carriers only offer delivery via pick-up (pick-up points or lockers). Recipients must provide accurate and complete contact information to avoid delivery failure." },
            { name: "Poland 🇵🇱", note: "Packstation addresses are only supported in Warsaw, Wroclaw, Poznan, and Krakow." },
            { name: "Portugal 🇵🇹", note: "PO BOX addresses are not accepted." },
            { name: "Greece 🇬🇷", note: "PO BOX addresses are not accepted." },
            { name: "Switzerland 🇨🇭", note: "If a recipient's total parcels received in one day exceed 62 CHF, customs will charge the recipient additional VAT and duties." },
            { name: "Ireland 🇮🇪", note: "We do not accept large orders and only accept orders with a size of up to 2 Lucky Spoons or 2 Surprise Boxes per package." }
          ]
        },
        asia: {
          title: "Asia",
          countries: [
            { name: "Singapore 🇸🇬", note: "" },
            { name: "Malaysia 🇲🇾", note: "" },
            { name: "Philippines 🇵🇭", note: "" },
            { name: "Thailand 🇹🇭", note: "" },
            { name: "Vietnam 🇻🇳", note: "" },
            { name: "South Korea 🇰🇷", note: "We do not accept bulk orders. Each order can include up to 1 Lucky Spoon or 1 Surprise Box only. The recipient's name, address, and other shipping details must be written in Korean. The Korean customs office now requires the recipient's ID and personal customs clearance code (PCCC), and the information must fully match the details registered with customs, including: recipient's name, phone number and shipping address. (The clearance code format is P + 12 digits, e.g., P123456789012) Please add this information to the order notes when placing your order." },
            { name: "Japan 🇯🇵", note: "We only accept parcels intended for personal use. Recipient addresses must not be commercial facilities (such as companies, warehouses, restaurants, hotels, etc.). Any losses caused by customs identifying the recipient's address as a commercial address will be borne by the recipient. It is recommended to write your name and address in Japanese. This will make it easier to fill in the shipping information and help the local delivery personnel deliver accurately. The recipient's name must be the full name and cannot be an abbreviation or only the first or last name; otherwise, customs clearance may be affected, resulting in unnecessary delays." },
            { name: "Israel 🇮🇱", note: "Gaza Strip is not reachable. Delivery is normally made to your door. Please make sure to provide a precise address and an accurate phone number. If you prefer to pick up your package at a \"pickup point\", please contact us." },
            { name: "United Arab Emirates 🇦🇪", note: "PO BOX addresses are not accepted. Please make sure to provide a precise address and an accurate phone number." },
            { name: "Saudi Arabia 🇸🇦", note: "We do not accept bulk orders. Each order can include up to 2 Lucky Spoon or 2 Surprise Box only. PO BOX addresses are not accepted. Please make sure to provide a precise address, an accurate phone number and a valid Short Address. The Short Address consists of 4 letters + 4 numbers, for example: RAGI2929. The Short Address can be obtained through the following methods for reference: 1. Via the Saudi Post (SPL) official website: https://splonline.com.sa/ar/ ; 2. By calling the automated hotline: +966 11 289 88888" },
            { name: "Kuwait 🇰🇼", note: "PO BOX addresses are not accepted. Please make sure to provide a precise address and an accurate phone number." },
            { name: "Qatar 🇶🇦", note: "PO BOX addresses are not accepted. Please make sure to provide a precise address and an accurate phone number." }
          ]
        },
        australia: {
          title: "Australia",
          countries: [
            { name: "Australia 🇦🇺", note: "" },
            { name: "New Zealand 🇳🇿", note: "" }
          ]
        }
      }
    },
    returns: {
      title: "Purchase & After-Sales Policy",
      intro: "For customers who have placed an order, we assume you have read and agreed to the following terms.",
      contact: {
        title: "📧 Contact Us",
        desc: "If you have any questions, please contact us by email only. Due to the large volume of spam and promotional messages on social media platforms, customer messages can easily get lost. We'll reply to all emails within 24 hours."
      },
      shipping: {
        title: "🚚 Shipping & Delivery",
        cancellation: {
          title: "Order Cancellation:",
          desc: "Once an order is placed, cancellation or refund requests without valid reasons are not supported. If you email us before the parcel is shipped and have a special reason to cancel, we'll review your case and may approve the cancellation and refund."
        },
        address: {
          title: "Shipping Address:",
          desc: "Once a parcel has been shipped, the delivery address cannot be modified. If you realize there's an error in your address after placing the order, please email us immediately. Please ensure your address is accurate and complete — ideally, one that can be located on Google Maps. If your address is an apartment, please include your floor and room number. If the parcel cannot be delivered due to inaccurate or incomplete address information, or because the delivery person cannot access the property, you will need to contact the local courier directly. We will, however, do our best to assist you in communicating with the courier to resolve the issue. If the parcel is returned to the logistics warehouse because of an address issue, we can help arrange a reshipment (within the same city only). Any reshipment fee will need to be covered by the buyer."
        },
        verification: {
          title: "Address Verification Before Shipping:",
          desc: "Before dispatching, we'll review all shipping addresses to ensure they are accurate. If we find missing or incorrect information, we'll email you for confirmation or help you correct it. If you do not respond within 3 days, your order will be cancelled and fully refunded."
        },
        lost: {
          title: "Lost Parcels:",
          desc: "We regularly track shipments. If a parcel is confirmed lost in transit, we'll proactively contact you to arrange a replacement or full refund."
        },
        notReceived: {
          title: "Delivered but Not Received:",
          desc: "If the tracking status shows \"delivered\" and the courier has provided proof of delivery, but you claim not to have received it, we recommend filing a police report. We are willing to fully cooperate with the investigation."
        }
      },
      notes: {
        title: "📝 Order Notes",
        desc: "You can leave a note during checkout to specify your personal preferences. We'll do our best to pack according to your notes, but we cannot guarantee every request can be fulfilled. If you forgot to leave a note or are unsure whether your note was saved, please email us immediately. If your parcel hasn't been shipped yet, we can still update your note."
      },
      confirmation: {
        title: "📩 Order Confirmation Email",
        desc: "After placing your order, our website will automatically send an order confirmation email to the address you entered at checkout. This email includes details such as purchased items, shipping address, email, phone number, and any notes. Please check and confirm that all information is correct. If you find any errors, email us within 2 hours — because once the parcel is shipped, we can no longer change your address, note, or contact info. Any delivery issues caused by incorrect address, missing notes, or wrong product selection during checkout are the buyer's responsibility. If you didn't receive the confirmation email, please check your spam folder first. If it's not there, contact us via email to verify your order details."
      },
      oneBox: {
        title: "📦 One Box per Order",
        desc: "Each order is packed into one box by default. If you ordered multiple scoops and want them packed into separate boxes, please clearly indicate that in your order note."
      },
      additional: {
        title: "🕒 Additional Info",
        processingTime: "Processing time: See FAQ section on our homepage.",
        shippingTime: "Shipping time: See FAQ section on our homepage."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What's inside a Surprise Box?", a: "Each Surprise Box comes with a specific theme—choose the one you love! Every box includes 15 cute gifts. Items are randomly selected. If you have a special wish, add a note at checkout; we will try our best (not guaranteed)." },
        { q: "Do you ship internationally?", a: "Yes, we ship to many countries worldwide. Please see our Shipping Information for details. If, after receiving payment, we cannot ship your order, we will refund you—no worries." },
        { q: "How do I pay?", a: "We accept multiple payment methods including Direct Bank Transfer, PayPal, and credit/debit cards." },
        { q: "Can I request specific items?", a: "The fun is in the surprise! You can leave a note at checkout with preferences; we will try our best." }
      ]
    },
    track: {
      title: "Track Your Order",
      desc: "Please provide a valid phone number and ensure your email address is correct so we can contact you quickly if any issue arises with your order. Double-check your shipping address for accuracy. If the address is inside a building, include the floor and room/apartment number; unclear addresses may prevent local couriers from locating you or lead to refusal. Any special requests must be added in the checkout notes, or emailed to us within 2 hours after placing the order.",
      placeholder: "Order Number (e.g. JP-8821)",
      note: "Tracking information typically becomes available 2-3 days after your order has been processed."
    },
    footer: {
      desc: "Bringing you the cutest stationery and surprise boxes. Secure direct payments and worldwide shipping.",
      care: "Customer Care",
      newsletter: "Newsletter",
      subDesc: "Subscribe to get notified about new surprise box drops!",
      join: "Join",
      rights: "All rights reserved.",
      tagline: "Designed for surprise box lovers everywhere."
    }
  },
  es: {
    nav: {
      home: "Inicio",
      all: "Todos los productos",
      about: "Nosotros",
      contact: "Contacto",
      track: "Rastrear",
      faq: "Preguntas",
      shipping: "Envíos",
      returns: "Devoluciones",
      brandName: "luckboxshop"
    },
    hero: {
      newCollection: "Nueva Colección",
      title: "Lindo y Caos",
      subtitle: "Cajas de Sorpresa",
      description: "Descubre nuestros estuches virales y cajas de sorpresa. Pago directo disponible sin comisiones.",
      cta: "Empezar a Buscar"
    },
    home: {
      trending: "Tendencias",
      items: "artículos"
    },
    product: {
      back: "Volver",
      reviews: "reseñas",
      sale: "OFERTA",
      viewDetails: "Ver Detalles",
      price: "Precio",
      buyerProtection: "Protección al Comprador",
      fastShipping: "Envío Rápido",
      securePayment: "Pago Seguro",
      howToPurchase: "Cómo Comprar",
      payApple: "Pagar con Apple Pay",
      tip: "Puede pagar directamente mediante transferencia bancaria a continuación, o usar PayPal para un pago seguro.",
      applePayModal: {
        title: "Pagar con Apple Pay",
        desc: "Apple Pay no está disponible actualmente. Por favor use PayPal o Transferencia Bancaria para el pago.",
        cancel: "Cancelar",
        chat: "Cerrar"
      }
    },
    bank: {
      title: "Información de Pago",
      subtitle: "Utilice los detalles a continuación para completar su transferencia bancaria.",
      beneficiary: "Beneficiario",
      bankName: "Banco",
      accountNo: "No. Cuenta",
      swift: "SWIFT / BIC",
      country: "País",
      province: "Provincia",
      city: "Ciudad",
      fullAddress: "Dirección Completa",
      footer: "Incluya su número de referencia de pedido en la descripción de la transferencia.",
      copy: "Copiar"
    },
    contact: {
      title: "Contáctenos",
      subtitle: "¿Tiene preguntas sobre su pedido?",
      getInTouch: "Póngase en contacto",
      emailSupport: "Soporte por Email",
      location: "Ubicación",
      hours: "Horario Laboral",
      form: {
        name: "Nombre",
        email: "Correo",
        orderNo: "Número de Pedido (Opcional)",
        message: "Mensaje",
        send: "Enviar Mensaje",
        sentTitle: "¡Mensaje Enviado!",
        sentDesc: "Gracias por contactarnos. Nuestro equipo responderá en 24 horas.",
        returnHome: "Volver al Inicio"
      }
    },
    about: {
      title: "Sobre Nosotros",
      content: [
        "¡Bienvenido a luckboxshop, tu destino definitivo para papelería linda, cajas de sorpresa y tesoros coleccionables!",
        "Fundada con pasión por todo lo kawaii, nos esforzamos por traer alegría a tu puerta con nuestra selección cuidadosamente curada. Ya sea que busques los últimos accesorios o la emoción de un scoop sorpresa, tenemos algo especial para ti.",
        "Somos un equipo pequeño y dedicado en Asia, que compra directamente a los fabricantes para garantizar autenticidad y los mejores precios."
      ],
      promiseTitle: "Nuestra Promesa",
      promises: [
        "Embalaje cuidadoso y entrega precisa."
      ]
    },
    shipping: {
      title: "Información de Envío",
      intro: "¡Hola a todos! Recientemente hemos agregado algunos países nuevos a nuestra lista de envíos. A continuación, se muestra la lista completa de países a los que actualmente enviamos. Para garantizar que cada paquete llegue de forma segura y sin problemas, trabajamos con transportistas confiables. Como resultado, algunos destinos tienen notas importantes: ¡léelas cuidadosamente! Si tu país puede recibir paquetes internacionales fácilmente pero aún no está en la lista, por favor hazme saber. ¡Gracias!",
      regions: {
        northAmerica: {
          title: "América del Norte",
          countries: [
            { name: "Estados Unidos 🇺🇸", note: "" },
            { name: "Canadá 🇨🇦", note: "No aceptamos pedidos al por mayor. Cada pedido puede incluir hasta 2 Lucky Spoon o 2 Caja de Sorpresa solamente. Debe proporcionarse el nombre completo del destinatario; no se permiten abreviaturas ni solo un nombre o apellido. Además, para el mismo destinatario, solo se acepta un pedido por semana. Tenga en cuenta que está estrictamente prohibido usar el nombre de una empresa, almacén, hotel, restaurante o cualquier otra institución comercial como destinatario. No se permiten nombres que contengan términos como \"Inc.\", \"LTD\" o \"Corporation\"." },
            { name: "México 🇲🇽", note: "" }
          ]
        },
        europe: {
          title: "Europa",
          countries: [
            { name: "Francia 🇫🇷", note: "" },
            { name: "Reino Unido 🇬🇧", note: "" },
            { name: "Alemania 🇩🇪", note: "" },
            { name: "Italia 🇮🇹", note: "" },
            { name: "España 🇪🇸", note: "" },
            { name: "Países Bajos 🇳🇱", note: "" },
            { name: "Bélgica 🇧🇪", note: "" },
            { name: "Austria 🇦🇹", note: "" },
            { name: "República Checa 🇨🇿", note: "" },
            { name: "Rumania 🇷🇴", note: "" },
            { name: "Eslovaquia 🇸🇰", note: "" },
            { name: "Hungría 🇭🇺", note: "" },
            { name: "Noruega 🇳🇴", note: "" },
            { name: "Luxemburgo 🇱🇺", note: "" },
            { name: "Chipre 🇨🇾", note: "" },
            { name: "Bulgaria 🇧🇬", note: "" },
            { name: "Croacia 🇭🇷", note: "" },
            { name: "Suecia 🇸🇪", note: "Algunos transportistas solo ofrecen entrega mediante recogida (puntos de recogida o lockers). Los destinatarios deben proporcionar información de contacto precisa y completa para evitar fallos en la entrega." },
            { name: "Dinamarca 🇩🇰", note: "Algunos transportistas solo ofrecen entrega mediante recogida (puntos de recogida o lockers). Los destinatarios deben proporcionar información de contacto precisa y completa para evitar fallos en la entrega." },
            { name: "Finlandia 🇫🇮", note: "Algunos transportistas solo ofrecen entrega mediante recogida (puntos de recogida o lockers). Los destinatarios deben proporcionar información de contacto precisa y completa para evitar fallos en la entrega." },
            { name: "Estonia 🇪🇪", note: "Algunos transportistas solo ofrecen entrega mediante recogida (puntos de recogida o lockers). Los destinatarios deben proporcionar información de contacto precisa y completa para evitar fallos en la entrega." },
            { name: "Letonia 🇱🇻", note: "Algunos transportistas solo ofrecen entrega mediante recogida (puntos de recogida o lockers). Los destinatarios deben proporcionar información de contacto precisa y completa para evitar fallos en la entrega." },
            { name: "Lituania 🇱🇹", note: "Algunos transportistas solo ofrecen entrega mediante recogida (puntos de recogida o lockers). Los destinatarios deben proporcionar información de contacto precisa y completa para evitar fallos en la entrega." },
            { name: "Polonia 🇵🇱", note: "Las direcciones de Packstation solo son compatibles en Varsovia, Breslavia, Poznan y Cracovia." },
            { name: "Portugal 🇵🇹", note: "No se aceptan direcciones de PO BOX." },
            { name: "Grecia 🇬🇷", note: "No se aceptan direcciones de PO BOX." },
            { name: "Suiza 🇨🇭", note: "Si los paquetes totales recibidos por un destinatario en un día superan los 62 CHF, la aduana cobrará al destinatario IVA y aranceles adicionales." },
            { name: "Irlanda 🇮🇪", note: "No aceptamos pedidos grandes y solo aceptamos pedidos con un tamaño de hasta 2 Lucky Spoons o 2 Cajas de Sorpresa por paquete." }
          ]
        },
        asia: {
          title: "Asia",
          countries: [
            { name: "Singapur 🇸🇬", note: "" },
            { name: "Malasia 🇲🇾", note: "" },
            { name: "Filipinas 🇵🇭", note: "" },
            { name: "Tailandia 🇹🇭", note: "" },
            { name: "Vietnam 🇻🇳", note: "" },
            { name: "Corea del Sur 🇰🇷", note: "No aceptamos pedidos al por mayor. Cada pedido puede incluir hasta 1 Lucky Spoon o 1 Caja de Sorpresa solamente. El nombre del destinatario, la dirección y otros detalles de envío deben estar escritos en coreano. La oficina de aduanas coreana ahora requiere el ID del destinatario y el código personal de despacho aduanero (PCCC), y la información debe coincidir completamente con los detalles registrados en la aduana, incluyendo: nombre del destinatario, número de teléfono y dirección de envío. (El formato del código de despacho es P + 12 dígitos, por ejemplo: P123456789012) Por favor, agregue esta información en las notas del pedido al realizarlo." },
            { name: "Japón 🇯🇵", note: "Solo aceptamos paquetes destinados para uso personal. Las direcciones de los destinatarios no deben ser instalaciones comerciales (como empresas, almacenes, restaurantes, hoteles, etc.). Cualquier pérdida causada por la aduana al identificar la dirección del destinatario como dirección comercial será responsabilidad del destinatario. Se recomienda escribir su nombre y dirección en japonés. Esto facilitará completar la información de envío y ayudará al personal de entrega local a entregar con precisión. El nombre del destinatario debe ser el nombre completo y no puede ser una abreviatura ni solo el nombre o el apellido; de lo contrario, el despacho aduanero puede verse afectado, lo que resultaría en retrasos innecesarios." },
            { name: "Israel 🇮🇱", note: "La Franja de Gaza no es accesible. La entrega se realiza normalmente en su puerta. Por favor, asegúrese de proporcionar una dirección precisa y un número de teléfono exacto. Si prefiere recoger su paquete en un \"punto de recogida\", por favor contáctenos." },
            { name: "Emiratos Árabes Unidos 🇦🇪", note: "No se aceptan direcciones de PO BOX. Por favor, asegúrese de proporcionar una dirección precisa y un número de teléfono exacto." },
            { name: "Arabia Saudita 🇸🇦", note: "No aceptamos pedidos al por mayor. Cada pedido puede incluir hasta 2 Lucky Spoon o 2 Caja de Sorpresa solamente. No se aceptan direcciones de PO BOX. Por favor, asegúrese de proporcionar una dirección precisa, un número de teléfono exacto y una Dirección Corta válida. La Dirección Corta consta de 4 letras + 4 números, por ejemplo: RAGI2929. La Dirección Corta se puede obtener a través de los siguientes métodos para referencia: 1. A través del sitio web oficial de Saudi Post (SPL): https://splonline.com.sa/ar/ ; 2. Llamando a la línea telefónica automatizada: +966 11 289 88888" },
            { name: "Kuwait 🇰🇼", note: "No se aceptan direcciones de PO BOX. Por favor, asegúrese de proporcionar una dirección precisa y un número de teléfono exacto." },
            { name: "Catar 🇶🇦", note: "No se aceptan direcciones de PO BOX. Por favor, asegúrese de proporcionar una dirección precisa y un número de teléfono exacto." }
          ]
        },
        australia: {
          title: "Australia",
          countries: [
            { name: "Australia 🇦🇺", note: "" },
            { name: "Nueva Zelanda 🇳🇿", note: "" }
          ]
        }
      }
    },
    returns: {
      title: "Política de Compra y Posventa",
      intro: "Para clientes que han realizado un pedido, asumimos que han leído y aceptado los siguientes términos.",
      contact: {
        title: "📧 Contáctenos",
        desc: "Si tiene alguna pregunta, por favor contáctenos solo por correo electrónico. Debido al gran volumen de spam y mensajes promocionales en plataformas de redes sociales, los mensajes de clientes pueden perderse fácilmente. Responderemos a todos los correos dentro de 24 horas."
      },
      shipping: {
        title: "🚚 Envío y Entrega",
        cancellation: {
          title: "Cancelación de Pedido:",
          desc: "Una vez realizado un pedido, no se admiten solicitudes de cancelación o reembolso sin razones válidas. Si nos envía un correo antes de que el paquete sea enviado y tiene una razón especial para cancelar, revisaremos su caso y podremos aprobar la cancelación y el reembolso."
        },
        address: {
          title: "Dirección de Envío:",
          desc: "Una vez que un paquete ha sido enviado, la dirección de entrega no puede modificarse. Si detecta un error en su dirección después de realizar el pedido, por favor envíenos un correo inmediatamente. Asegúrese de que su dirección sea precisa y completa — idealmente, una que pueda ubicarse en Google Maps. Si su dirección es un apartamento, por favor incluya su piso y número de habitación. Si el paquete no puede ser entregado debido a información de dirección inexacta o incompleta, o porque el repartidor no puede acceder a la propiedad, deberá contactar directamente al mensajero local. Sin embargo, haremos todo lo posible para asistirle en la comunicación con el mensajero para resolver el problema. Si el paquete es devuelto al almacén logístico debido a un problema de dirección, podemos ayudar a organizar un reenvío (solo dentro de la misma ciudad). Cualquier tarifa de reenvío deberá ser cubierta por el comprador."
        },
        verification: {
          title: "Verificación de Dirección Antes del Envío:",
          desc: "Antes de despachar, revisaremos todas las direcciones de envío para asegurarnos de que sean precisas. Si encontramos información faltante o incorrecta, le enviaremos un correo para confirmación o ayudarle a corregirla. Si no responde dentro de 3 días, su pedido será cancelado y reembolsado completamente."
        },
        lost: {
          title: "Paquetes Perdidos:",
          desc: "Rastreamos regularmente los envíos. Si se confirma que un paquete se perdió en tránsito, le contactaremos proactivamente para organizar un reemplazo o reembolso completo."
        },
        notReceived: {
          title: "Entregado pero No Recibido:",
          desc: "Si el estado de rastreo muestra \"entregado\" y el mensajero ha proporcionado prueba de entrega, pero usted afirma no haberlo recibido, recomendamos presentar un informe policial. Estamos dispuestos a cooperar completamente con la investigación."
        }
      },
      notes: {
        title: "📝 Notas del Pedido",
        desc: "Puede dejar una nota durante el pago para especificar sus preferencias personales. Haremos todo lo posible para empacar según sus notas, pero no podemos garantizar que cada solicitud pueda cumplirse. Si olvidó dejar una nota o no está seguro de si su nota fue guardada, por favor envíenos un correo inmediatamente. Si su paquete aún no ha sido enviado, aún podemos actualizar su nota."
      },
      confirmation: {
        title: "📩 Correo de Confirmación de Pedido",
        desc: "Después de realizar su pedido, nuestro sitio web enviará automáticamente un correo de confirmación de pedido a la dirección que ingresó en el pago. Este correo incluye detalles como artículos comprados, dirección de envío, correo, número de teléfono y cualquier nota. Por favor revise y confirme que toda la información sea correcta. Si encuentra algún error, envíenos un correo dentro de 2 horas — porque una vez que el paquete sea enviado, ya no podremos cambiar su dirección, nota o información de contacto. Cualquier problema de entrega causado por dirección incorrecta, notas faltantes o selección incorrecta del producto durante el pago es responsabilidad del comprador. Si no recibió el correo de confirmación, por favor revise primero su carpeta de spam. Si no está allí, contáctenos por correo para verificar los detalles de su pedido."
      },
      oneBox: {
        title: "📦 Una Caja por Pedido",
        desc: "Cada pedido se empaca en una caja por defecto. Si ordenó múltiples scoops y desea que se empaquen en cajas separadas, por favor indíquelo claramente en su nota de pedido."
      },
      additional: {
        title: "🕒 Información Adicional",
        processingTime: "Tiempo de procesamiento: Consulte la sección de Preguntas Frecuentes en nuestra página principal.",
        shippingTime: "Tiempo de envío: Consulte la sección de Preguntas Frecuentes en nuestra página principal."
      }
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        { q: "¿Qué incluye una Caja de Sorpresa?", a: "Cada Caja de Sorpresa tiene un tema específico: ¡elige el que más te guste! Cada caja incluye 15 regalos lindos. Los artículos se seleccionan de forma aleatoria. Si tienes un deseo especial, añade una nota al pagar; haremos lo posible (no garantizado)." },
        { q: "¿Hacen envíos internacionales?", a: "Sí, enviamos a muchos países del mundo. Consulta nuestra Información de Envíos para los detalles. Si después de recibir el pago no podemos enviar tu pedido, te reembolsaremos—sin preocupaciones." },
        { q: "¿Cómo pago?", a: "Aceptamos múltiples métodos de pago, incluyendo Transferencia Bancaria Directa, PayPal y tarjetas de crédito/débito." },
        { q: "¿Puedo solicitar artículos específicos?", a: "La diversión está en la sorpresa. Puedes dejar una nota al pagar con tus preferencias; haremos lo posible." }
      ]
    },
    track: {
      title: "Rastrear Pedido",
      desc: "Por favor, proporcione un número de teléfono válido y asegúrese de que su correo electrónico sea correcto para que podamos contactarle rápidamente si surge algún problema con su pedido. Revise cuidadosamente que su dirección de envío sea precisa. Si la dirección está dentro de un edificio, incluya piso y número de habitación/apartamento; una dirección poco clara puede impedir que los mensajeros locales le encuentren o incluso provocar rechazo. Cualquier solicitud especial debe añadirse en las notas de pago, o enviarse por correo electrónico dentro de las 2 horas posteriores a la compra.",
      placeholder: "Número de Pedido (ej. JP-8821)",
      note: "La información de rastreo generalmente está disponible 2-3 días después del procesamiento."
    },
    footer: {
      desc: "Llevándote la papelería más linda y cajas de sorpresa. Pagos directos seguros y envíos a todo el mundo.",
      care: "Atención al Cliente",
      newsletter: "Boletín",
      subDesc: "¡Suscríbete para recibir notificaciones sobre nuevas cajas de sorpresa!",
      join: "Unirse",
      rights: "Todos los derechos reservados.",
      tagline: "Diseñado para amantes de las cajas de sorpresa."
    }
  }
};
