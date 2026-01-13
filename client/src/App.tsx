import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-6xl mx-auto py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
