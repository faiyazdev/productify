import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import {
  ShoppingBagIcon,
  PlusIcon,
  UserIcon,
  LayoutDashboardIcon,
  Menu,
  X,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const { isSignedIn } = useAuth();
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
        {/* MAIN BAR */}
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 btn btn-ghost px-2 hover:bg-transparent"
            onClick={closeMenu}
          >
            <ShoppingBagIcon className="w-5 h-5 text-primary shrink-0" />
            <span className="text-base sm:text-lg font-bold font-mono uppercase tracking-wider">
              Productify
            </span>
          </Link>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex gap-2 items-center">
            <ThemeSelector />

            {isSignedIn ? (
              <>
                <Link to="/dashboard" className="btn btn-ghost btn-sm gap-1">
                  <LayoutDashboardIcon className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <Link to="/create" className="btn btn-primary btn-sm gap-1">
                  <PlusIcon className="w-4 h-4" />
                  <span>New Product</span>
                </Link>

                <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                  <UserIcon className="w-4 h-4" />
                  <span>Profile</span>
                </Link>

                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-sm">Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-outline btn-sm">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
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

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 space-y-2 border-t border-base-content/10">
            <div className="px-1">
              <ThemeSelector />
            </div>

            {isSignedIn ? (
              <>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="btn btn-ghost w-full justify-start py-3 gap-2"
                >
                  <LayoutDashboardIcon className="w-4 h-4 shrink-0" />
                  Dashboard
                </button>

                <button
                  onClick={() => handleNavigation("/create")}
                  className="btn btn-ghost w-full justify-start py-3 gap-2"
                >
                  <PlusIcon className="w-4 h-4 shrink-0" />
                  New Product
                </button>

                <button
                  onClick={() => handleNavigation("/profile")}
                  className="btn btn-ghost w-full justify-start py-3 gap-2"
                >
                  <UserIcon className="w-4 h-4 shrink-0" />
                  Profile
                </button>

                <div className="px-2 pt-2">
                  <UserButton />
                </div>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button
                    onClick={closeMenu}
                    className="btn btn-ghost w-full justify-start py-3"
                  >
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button
                    onClick={closeMenu}
                    className="btn btn-outline w-full justify-start py-3"
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
