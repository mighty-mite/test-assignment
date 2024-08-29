import { ICard } from "../utils/types";

const useHttp = () => {
  const getAllProducts = async (
    query = "https://fakestoreapi.com/products",
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    const response = await fetch(query, { method, body, headers });

    if (!response.ok) {
      throw new Error(`Could not fetch ${query}, status: ${response.status}`);
    }

    const data = await response.json();

    return { data };
  };

  const getSingleProduct = async (
    id: string,
    query = `https://fakestoreapi.com/products/${id}`,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    const response = await fetch(query, { method, body, headers });

    if (!response.ok) {
      throw new Error(`Could not fetch ${query}, status: ${response.status}`);
    }

    const data = await response.json();
    return data as ICard;
  };

  return {
    getAllProducts,
    getSingleProduct,
  };
};

export default useHttp;
