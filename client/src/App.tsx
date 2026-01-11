import { useEffect, useState } from "react";

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

  return <div>{data}</div>;
}

export default App;
