import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { SendIcon, MessageSquareIcon, LogInIcon } from "lucide-react";
import { useCreateComment } from "../hooks/useComments";
import CommentCard from "./CommentCard";

function CommentsSection({
  productId,
  comments,
  currentUserId,
}: {
  productId: string;
  comments: {
    id: string;
    createdAt: string;
    content: string;
    owner: { id: string; name: string; imageUrl: string };
  }[];
  currentUserId: string;
}) {
  const { isSignedIn } = useAuth();
  const [content, setContent] = useState("");
  const createComment = useCreateComment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate(
      { productId, content },
      { onSuccess: () => setContent("") },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-primary" />
        <h3 className="font-bold">Comments</h3>
        <span className="badge badge-neutral badge-sm">{comments.length}</span>
      </div>

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="input input-bordered input-sm flex-1 bg-base-200"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-square"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
          <span className="text-sm text-base-content/60">
            Sign in to join the conversation
          </span>
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm gap-1">
              <LogInIcon className="size-4" />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <MessageSquareIcon className="size-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No comments yet. Be first!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              productId={productId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
