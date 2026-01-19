import axiosInstance from "../lib/axios";

export const createComment = async ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const response = await axiosInstance.post(`/comments/${productId}`, {
    content,
  });
  return response.data as {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
    productId: string;
  };
};
export const deleteComment = async ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const response = await axiosInstance.post(`/comments/${productId}`, {
    content,
  });
  return response.data as {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
    productId: string;
  };
};
