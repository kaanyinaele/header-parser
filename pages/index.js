import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const getInfo = async () => {
    try {
      const response = await fetch("/api/whoami"); // Call the API
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Get the JSON response
      setResult(data); // Set the result state
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "rgb(247, 241, 234)",
        }}
      >
        <h1
          style={{ fontFamily: '"Chakra Petch", sans-serif', fontWeight: 600 }}
        >
          Request Header Parser Microservice
        </h1>
        <button
          onClick={getInfo}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "rgb(69, 151, 251)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Get My Info
        </button>
        {result && (
          <pre
            style={{
              padding: "20px",
              borderRadius: "5px",
              backgroundColor: "rgb(69, 151, 251)",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </>
  );
}
