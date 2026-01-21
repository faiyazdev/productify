import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import useAuthReq from "./hooks/useAuthReq";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EditProductPage from "./pages/EditProductPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardNavbar from "./dashboard/DashboardNavbar";
import DashboardPage from "./dashboard/DashboardPage";

function App() {
  const { isSignedIn, isClerkLoaded } = useAuthReq();
  if (!isClerkLoaded) return null;

  return (
    <div className="min-h-screen bg-base-100">
      <Routes>
        {/* Dashboard routes with DashboardNavbar */}
        <Route
          path="/dashboard/*"
          element={
            isSignedIn ? (
              <>
                <DashboardNavbar />
                <main className="max-w-6xl mx-auto px-4 py-6">
                  <Routes>
                    <Route index element={<DashboardPage />} />
                    {/* Add more dashboard sub-routes here */}
                  </Routes>
                </main>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Main app routes with regular Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="max-w-6xl mx-auto px-4 py-6">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route
                    path="/create"
                    element={isSignedIn ? <CreatePage /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/profile"
                    element={isSignedIn ? <ProfilePage /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/edit/:id"
                    element={
                      isSignedIn ? <EditProductPage /> : <Navigate to="/" />
                    }
                  />
                </Routes>
              </main>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
