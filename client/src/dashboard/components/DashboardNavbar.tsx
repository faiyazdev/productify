import { useState } from "react";
import {
  ShoppingBag,
  ListOrdered,
  ShoppingCart,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";

function DashboardNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  return (
    <nav className="bg-base-300 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto w-full px-4">
        {/* Main Navbar Container */}
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-2 btn btn-ghost px-2 hover:bg-transparent"
          >
            <ShoppingBag className="w-5 h-5 text-primary shrink-0" />
            <span className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider">
              Productify-Dashboard
            </span>
          </button>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex gap-2 items-center">
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="btn btn-ghost btn-sm flex items-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => handleNavigation("/dashboard/products")}
              className="btn btn-ghost btn-sm flex items-center gap-1"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Products</span>
            </button>
            <button
              onClick={() => handleNavigation("/dashboard/sales")}
              className="btn btn-ghost btn-sm flex items-center gap-1"
            >
              <ListOrdered className="w-4 h-4" />
              <span>Sales</span>
            </button>
          </div>

          {/* MOBILE / TABLET HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden btn btn-ghost btn-square btn-sm"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* MOBILE / TABLET MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 space-y-2 border-t border-base-content/10">
            <>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="btn btn-ghost w-full justify-start h-auto py-3 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/products")}
                className="btn btn-ghost w-full justify-start h-auto py-3 flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>Products</span>
              </button>
              <button
                onClick={() => handleNavigation("/dashboard/sales")}
                className="btn btn-ghost w-full justify-start h-auto py-3 flex items-center gap-2"
              >
                <ListOrdered className="w-4 h-4 shrink-0" />
                <span>Sales</span>
              </button>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
