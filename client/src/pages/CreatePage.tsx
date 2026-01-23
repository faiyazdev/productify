import { Link, useNavigate } from "react-router";
import { useState } from "react";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SparklesIcon,
  TypeIcon,
  DollarSignIcon,
} from "lucide-react";
import { useCreateProduct } from "../hooks/useProducts";

type ProductFormState = {
  title: string;
  description: string;
  imageUrl: string;
  price: number | "";
  status: "public" | "private";
};

function CreatePage() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const [formData, setFormData] = useState<ProductFormState>({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    status: "public",
  });

  const isFormValid =
    formData.title.trim() && formData.price !== "" && formData.price > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    createProductMutation.mutate(
      {
        ...formData,
        price: Number(formData.price),
      },
      {
        onSuccess: () => navigate("/"),
      },
    );
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SparklesIcon className="size-5 text-primary" />
            New Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* TITLE */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Product title"
                className="grow"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </label>

            {/* PRICE */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <DollarSignIcon className="size-4 text-base-content/50" />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="19.99"
                className="grow"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                required
              />
            </label>

            {/* STATUS */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <span className="text-sm text-base-content/60">Status</span>
              <select
                className="grow bg-transparent"
                value={formData.status}
                disabled={createProductMutation.isPending}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as ProductFormState["status"],
                  })
                }
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </label>

            {/* IMAGE URL */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="url"
                placeholder="Image URL"
                className="grow"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </label>

            {/* IMAGE PREVIEW */}
            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden border border-base-300">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                />
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {createProductMutation.isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to create product. Try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!isFormValid || createProductMutation.isPending}
            >
              {createProductMutation.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Create Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
