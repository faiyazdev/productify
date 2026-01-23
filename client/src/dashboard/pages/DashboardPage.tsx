import { Home } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useMyProducts } from "../../hooks/useProducts";
import { Link } from "react-router";

function DashboardPage() {
  const { data: products, isLoading, error } = useMyProducts();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="mb-5">Welcome to Dashboard</h1>
        <Link to="/" className="btn btn-link gap-2 px-0">
          <Home className="size-5 text-primary" />
          <span className="text-lg font-bold font-mono uppercase tracking-wider">
            Productify Home
          </span>
        </Link>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="alert alert-error">
          Failed to load products. Please retry.
        </div>
      ) : (
        <div className="stats bg-base-300 w-full mt-5">
          <div className="stat">
            <div className="stat-title">Total Products</div>
            <div className="stat-value text-primary">
              {products?.length || 0}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
