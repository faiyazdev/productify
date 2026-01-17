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
  if (response.status !== 201) {
    throw new Error("Failed to create product");
  }
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/products");
  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }
  return response.data as {
    title: string;
    description: string;
    imageUrl: string;
    author: {
      name: string;
      imageUrl: string;
    };
    comments: { id: string }[];
    createdAt: string;
    id: string;
  }[];
};
