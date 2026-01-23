import {
  ArrowLeftIcon,
  EditIcon,
  CalendarIcon,
  UserIcon,
  Trash2Icon,
  GlobeIcon,
  LockIcon,
  DollarSignIcon,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useParams, Link, useNavigate } from "react-router";
import { useDeleteProduct, useProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import CommentsSection from "../components/CommentSection";
import { formatCurrency } from "../lib/formatter";

function ProductDetailsPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { data: product, error, isLoading } = useProduct(id!);
  const deleteProduct = useDeleteProduct();
  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct.mutate(id!, { onSuccess: () => navigate("/") });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product not found</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = userId === product?.owner.clerkId;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="btn btn-ghost btn-sm gap-1">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${product.id}`}
              className="btn btn-ghost btn-sm gap-1"
            >
              <EditIcon className="size-4" /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm gap-1"
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <Trash2Icon className="size-4" />
              )}
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image */}
        <div className="card bg-base-300">
          <figure className="p-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="rounded-xl w-full h-80 object-cover"
            />
          </figure>
        </div>

        <div className="card bg-base-300">
          <div className="card-body">
            <h1 className="card-title text-2xl">{product.title}</h1>

            {/* PRICE & STATUS */}
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                <DollarSignIcon className="size-5" />
                {formatCurrency(product.priceInCents / 100)}
              </div>

              <span
                className={`badge badge-outline ${
                  product.status === "public" ? "badge-success" : "badge-ghost"
                }`}
              >
                {product.status === "public" ? (
                  <>
                    <GlobeIcon className="size-3 mr-1" /> Public
                  </>
                ) : (
                  <>
                    <LockIcon className="size-3 mr-1" /> Private
                  </>
                )}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="size-4" />
                {product?.owner?.name}
              </div>
            </div>

            <div className="divider my-2"></div>

            <p className="text-base-content/80 leading-relaxed">
              {product.description}
            </p>

            {product?.owner && (
              <>
                <div className="divider my-2"></div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={product?.owner.imageUrl}
                        alt={product?.owner.name}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{product?.owner.name}</p>
                    <p className="text-xs text-base-content/50">Creator</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="card bg-base-300">
        <div className="card-body">
          <CommentsSection
            productId={product.id}
            comments={product.comments}
            currentUserId={product.owner.id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
