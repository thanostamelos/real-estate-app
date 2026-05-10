import { USERS_LIST } from "./users";

export const OWNERS = [
  {
    propertiesOwned: PROPERTIES.filter((p) => p.userId === 1),
    ...USERS_LIST.find((u) => u.userId === 1),
  },
  {
    propertiesOwned: PROPERTIES.filter((p) => p.userId === 2),
    ...USERS_LIST.find((u) => u.userId === 2),
  },
  {
    propertiesOwned: PROPERTIES.filter((p) => p.userId === 4),
    ...USERS_LIST.find((u) => u.userId === 4),
  },
];
