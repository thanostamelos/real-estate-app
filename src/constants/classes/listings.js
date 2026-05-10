import { LISTING_STATUS } from "../listingStatus";
import { RATING } from "../ratings";
import { PROPERTIES } from "./properties";

export const LISTINGS = [
  {
    listingId: 1,
    datePosted: "2024-06-01",
    status: LISTING_STATUS.ACTIVE,
    views: 120,
    ratings: RATING.filter((r) => r.listingId === LISTINGS[0]?.listingId),
    ...PROPERTIES.filter((p) => p.propertyId === 1),
  },
  {
    listingId: 2,
    datePosted: "2024-06-05",
    status: LISTING_STATUS.ACTIVE,
    views: 85,
    ratings: RATING.filter((r) => r.listingId === LISTINGS[1]?.listingId),
    ...PROPERTIES.filter((p) => p.propertyId === 2),
  }
];
