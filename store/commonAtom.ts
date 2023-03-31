import { atom } from "recoil";

const prefix =
  process.env.NODE_ENV === "production"
    ? "https://eunchu.github.io/portfolio-23"
    : "";

export const commonState = atom({
  key: "url",
  default: prefix,
});
