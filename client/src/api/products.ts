import axiosInstance from "../lib/axios";

export const createProduct = async ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  const response = await axiosInstance.post("/products", {
    title,
    description,
    imageUrl,
  });
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/products");
  if (response.data === null) return [];
  return response.data as {
    title: string;
    description: string;
    imageUrl: string;
    owner: {
      name: string;
      imageUrl: string;
    };
    comments: { id: string }[];
    createdAt: string;
    id: string;
  }[];
};
