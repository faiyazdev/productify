import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import useAuthReq from "./hooks/useAuthReq";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isSignedIn, isClerkLoaded } = useAuthReq();
  if (!isClerkLoaded) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/create"
            element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
