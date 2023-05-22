import { IUser } from "./interface/usersApi";
import { userClient } from ".";

export const usersFactory = () => {
  // NOTE [Create]
  const createUser = async (user: IUser) => {
    return await userClient
      .post("", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  };

  // NOTE [Get]
  const readUser = async () => {
    return (await userClient.get("")).data;
  };

  return {
    createUser,
    readUser,
  };
};
