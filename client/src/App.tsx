import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    const res = fetch(`${import.meta.env.VITE_BACKEND_URL}/12345`);
    res.then((response) => {
      response.json().then((data) => {
        setData(data.message);
      });
    });
  }, []);

  return (
    <div>
      {data}
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
}

export default App;
