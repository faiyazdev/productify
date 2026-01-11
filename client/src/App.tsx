import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    const res = fetch("http://localhost:3000/testing");
    res.then((response) => {
      response.json().then((data) => {
        setData(data.message);
      });
    });
  }, []);

  return <div>{data}</div>;
}

export default App;
