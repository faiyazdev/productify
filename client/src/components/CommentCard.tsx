import { Trash2Icon } from "lucide-react";
import { useDeleteComment } from "../hooks/useComments";

function CommentCard({
  comment,
  currentUserId,
  productId,
}: {
  comment: {
    id: string;
    createdAt: string;
    content: string;
    owner: {
      id: string;
      name: string;
      imageUrl: string;
    };
  };
  currentUserId: string;
  productId: string;
}) {
  const deleteComment = useDeleteComment();

  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img src={comment.owner?.imageUrl} alt={comment.owner?.name} />
        </div>
      </div>

      <div className="chat-header text-xs opacity-70 mb-2">
        {comment.owner?.name}
        <time className="ml-2 text-xs opacity-50">
          {new Date(comment.createdAt).toLocaleDateString()}
        </time>
      </div>

      <div className="chat-bubble chat-bubble-neutral text-sm">
        {comment.content}
      </div>

      {currentUserId === comment.owner.id && (
        <div className="chat-footer">
          <button
            onClick={() => {
              deleteComment.mutate({
                commentId: comment.id,
                productId,
              });
            }}
            className="btn btn-ghost btn-xs text-error"
            disabled={deleteComment.isPending}
          >
            {deleteComment.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <Trash2Icon className="size-3" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentCard;
