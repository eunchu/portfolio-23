import { atom } from "recoil";
import { v1 } from "uuid";

export const commonAtom = atom<number | null>({
  key: `movie${v1()}`,
  default: null,
});
