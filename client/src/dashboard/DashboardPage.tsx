import LoadingSpinner from "../components/LoadingSpinner";
import { useMyProducts } from "../hooks/useProducts";

function DashboardPage() {
  const { data: products, isLoading } = useMyProducts();

  return (
    <div>
      <h1 className="mb-5">Dashboard</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="stats bg-base-300 w-full">
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
