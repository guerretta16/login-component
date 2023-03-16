import { LoginInfo } from "../interfaces/types";

export const loginService = async (data: LoginInfo) => {
  return await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
