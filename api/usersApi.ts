import axios from "axios";

import { IUser } from "./interface/usersApi";

interface IApiFactory {
  baseUrl: string;
}
export const usersFactory = ({ baseUrl }: IApiFactory) => {
  // NOTE [Create]
  const createUser = async (user: IUser) => {
    return await axios
      .post(baseUrl, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  };

  // NOTE [Get]
  const readUser = async () => {
    return (await axios.get(baseUrl)).data;
  };

  return {
    createUser,
    readUser,
  };
};
