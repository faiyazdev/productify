import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment } from "../api/comments";

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variable) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["product", variable.productId],
      });
    },
  });
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variable) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["product", variable.productId],
      });
    },
  });
};
