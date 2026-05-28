import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

function App() {
  const [seconds, setSeccods] = useState(10);

  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((current) => current - 2);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    //We made a cancel button = AbortController
    const controller = new AbortController();

    async function fetchData() {
      try {
        setStatus("pending");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            signal: controller.signal,
          },
        );

        const data = await response.json();

        setPosts(data.quotes);
        setStatus("resolved");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        }
      }
    }
  }, []);
  return (
    <>
      <div>
        <h1>useEffect</h1>
      </div>
    </>
  );
}

export default App;
