import { Link } from "react-router";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import {
  ShoppingBagIcon,
  HomeIcon,
  ListOrdered,
  ShoppingCartIcon,
} from "lucide-react";
import ThemeSelector from "../components/ThemeSelector";

function DashboardNavbar() {
  const { isSignedIn } = useAuth();

  return (
    <div className="navbar bg-base-300">
      <div className="max-w-6xl mx-auto w-full px-2 flex justify-between items-center">
        {/* LOGO - LEFT SIDE */}
        {/* <div className=""> */}
        <Link to="/" className="btn btn-ghost gap-2 px-0">
          <ShoppingBagIcon className="size-5 text-primary" />
          <span className="text-lg font-bold font-mono uppercase tracking-wider">
            Productify-Dashboard
          </span>
        </Link>
        {/* </div> */}

        <div className="flex gap-2 items-center">
          <ThemeSelector />
          {isSignedIn ? (
            <>
              <Link to="/" className="btn btn-ghost btn-sm gap-1">
                <HomeIcon className="size-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to="/dashboard/products"
                className="btn btn-ghost btn-sm gap-1"
              >
                <ShoppingCartIcon className="size-4" />
                <span className="hidden sm:inline">Products</span>
              </Link>
              <Link
                to="/dashboard/sales"
                className="btn btn-ghost btn-sm gap-1"
              >
                <ListOrdered className="size-4" />
                <span className="hidden sm:inline">Sales</span>
              </Link>
            </>
          ) : (
            <>
              <div className="hidden sm:block">
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-sm">Sign In</button>
                </SignInButton>
              </div>
              <SignUpButton mode="modal">
                <button className="btn btn-outline btn-sm">Get Started</button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default DashboardNavbar;
