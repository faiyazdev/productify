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
export const updateProduct = async ({
  productId,
  productData,
}: {
  productId: string;
  productData: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
}) => {
  const response = await axiosInstance.put(
    `/products/${productId}`,
    productData,
  );
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
export const fetchProduct = async (id: string) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data as {
    createdAt: string;
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    owner: {
      id: string;
      name: string;
      imageUrl: string;
      clerkId: string;
    };
    comments: {
      id: string;
      createdAt: string;
      content: string;
      owner: { id: string; name: string; imageUrl: string };
    }[];
  };
};
export const deleteProduct = async (id: string) => {
  return await axiosInstance.delete(`/products/${id}`);
};
