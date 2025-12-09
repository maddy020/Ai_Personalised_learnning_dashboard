import axios from "axios";
import { ResponseType, tokenData } from "./types";
import { jwtDecode } from "jwt-decode";
export async function handleAuth(
  isLogin: boolean,
  isGuest: boolean,
  formData: { name: string; email: string; password: string },
  handleFormData: (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    arg: boolean
  ) => void,
  handleLoginState: (arg: boolean) => void
) {
  try {
    let token = "";
    if (isLogin || isGuest) {
      let finalFormData = formData;
      if (isGuest) {
        finalFormData = {
          name: process.env.NEXT_PUBLIC_GUEST_NAME!,
          email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
          password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
        };
      }
      const response: ResponseType = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          formData: finalFormData,
        }
      );
      if (response.data.status === 200) {
        handleFormData({ name: "", email: "", password: "" }, true);
        token = response.data && response.data.token;
      }
    } else {
      const response: ResponseType = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
          formData,
        }
      );
      if (response.data.status === 200) {
        handleFormData({ name: "", email: "", password: "" }, false);
        handleLoginState(true);
        token = response.data.token;
      }
    }
    if (token) sessionStorage.setItem("token", token);
    const decodeToken: tokenData = jwtDecode(token);
    if (decodeToken) localStorage.setItem("name", decodeToken.name);
  } catch (error) {
    console.log("Error in submitting the form", error);
  }
}
