import { PROPERTY_STATUS } from "../propertyStatus";
import { PROPERTY_TYPES } from "../propertyType";

export const PROPERTIES = [
  {
    propertyId: 1,
    userId: 1,
    title: "Modern Apartment with City View",
    description:
      "Recently renovated apartment with balcony and open view. Close to metro and supermarkets.",
    price: 780.0,
    address: "123 Main St, Peristeri, Athens",
    type: PROPERTY_TYPES.APARTMENT,
    images: ["/apartments/apart1.jpg", "/apartments/apart2.jpg"],
    location: "Peristeri, Athens",
    status: PROPERTY_STATUS.FOR_RENT,
  },
  {
    propertyId: 2,
    userId: 1,
    title: "Modern Apartment with City View",
    description:
      "Recently renovated apartment with balcony and open view. Close to metro and supermarkets.",
    price: 780.0,
    address: "45 Agiou Antoniou St, Peristeri, Athens",
    type: PROPERTY_TYPES.APARTMENT,
    images: ["/apartments/apart1.jpg"],
    location: "Peristeri, Athens",
    status: PROPERTY_STATUS.FOR_RENT,
  },
  {
    propertyId: 3,
    userId: 1,
    title: "Cozy Family House with Garden",
    description:
      "Spacious house with private garden, ideal for families. Quiet neighborhood with easy access to main roads.",
    price: 125.000,
    address: "12 Kifisias Ave, Marousi, Athens",
    type: PROPERTY_TYPES.HOUSE,
    images: ["/apartments/apart2.jpg"],
    location: "Marousi, Athens",
    status: PROPERTY_STATUS.FOR_SALE,
  },
  {
    propertyId: 4,
    userId: 2,
    title: "Luxury Loft Downtown",
    description:
      "Industrial-style loft with modern design, high ceilings and premium finishes in the heart of the city.",
    price: 1600.0,
    address: "88 Ermou St, Athens Center",
    type: PROPERTY_TYPES.LOFT,
    images: ["/apartments/apart3.jpg"],
    location: "Athens Center",
    status: PROPERTY_STATUS.FOR_RENT,
  },
  {
    propertyId: 5,
    userId: 2,
    title: "Minimal Studio Near University",
    description:
      "Compact and functional studio ideal for students. Fully furnished and energy efficient.",
    price: 500.0,
    address: "7 Papagou St, Zografou, Athens",
    type: PROPERTY_TYPES.STUDIO,
    images: ["/apartments/apart4.jpg"],
    location: "Zografou, Athens",
    status: PROPERTY_STATUS.FOR_RENT,
  },
  {
    propertyId: 6,
    userId: 4,
    title: "Seaside Apartment with Balcony",
    description:
      "Beautiful apartment near the sea with large balcony and sunset view. Perfect for relaxing lifestyle.",
    price: 1100.0,
    address: "22 Akti Miaouli, Piraeus, Athens",
    type: PROPERTY_TYPES.APARTMENT,
    images: ["/apartments/apart5.jpg"],
    location: "Piraeus, Athens",
    status: PROPERTY_STATUS.FOR_RENT,
  },
  {
    propertyId: 7,
    userId: 4,
    title: "Bright Penthouse with Terrace",
    description:
      "Elegant penthouse with large private terrace, panoramic city view and premium interior design.",
    price: 190.000,
    address: "3 Skoufa St, Kolonaki, Athens",
    type: PROPERTY_TYPES.PENTHOUSE,
    images: ["/apartments/apart6.jpg"],
    location: "Kolonaki, Athens",
    status: PROPERTY_STATUS.FOR_SALE,
  },
  {
    propertyId: 8,
    userId: 4,
    title: "Affordable Renovated Flat",
    description:
      "Recently renovated flat in a quiet neighborhood, ideal for couples or small families.",
    price: 650.0,
    address: "18 Irakleiou St, Nea Ionia, Athens",
    type: PROPERTY_TYPES.APARTMENT,
    images: ["/apartments/apart7.jpg"],
    location: "Nea Ionia, Athens",
    status: PROPERTY_STATUS.FOR_RENT,
  },
];
