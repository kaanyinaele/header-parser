import { useState } from "react";
import { Search } from "lucide-react";

function ResultCard({ result }) {
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed: ", err);
    }
  };

  const deviceLabel = result.device
    ? [result.device.vendor, result.device.model, result.device.type]
        .filter(Boolean)
        .join(" ")
    : null;

  return (
    <div className="resultCard" aria-live="polite">
      <dl className="resultList">
        <div className="resultRow">
          <dt>IP Address</dt>
          <dd>{result.ipaddress}</dd>
        </div>
        <div className="resultRow">
          <dt>Language</dt>
          <dd>{result.language}</dd>
        </div>
        {result.browser && (
          <div className="resultRow">
            <dt>Browser</dt>
            <dd>
              {result.browser.name} {result.browser.version}
            </dd>
          </div>
        )}
        {result.os && (
          <div className="resultRow">
            <dt>OS</dt>
            <dd>
              {result.os.name} {result.os.version}
            </dd>
          </div>
        )}
        {deviceLabel && (
          <div className="resultRow">
            <dt>Device</dt>
            <dd>{deviceLabel}</dd>
          </div>
        )}
      </dl>

      <div className="resultActions">
        <button className="linkButton" onClick={() => setShowRaw((v) => !v)}>
          {showRaw ? "Hide raw JSON" : "Show raw JSON"}
        </button>
        <button className="linkButton" onClick={copyJson}>
          {copied ? "Copied!" : "Copy JSON"}
        </button>
      </div>

      {showRaw && <pre className="rawJson">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/whoami"); // Call the API
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Get the JSON response
      setResult(data); // Set the result state
    } catch (error) {
      console.error("Fetch error: ", error);
      setError("Something went wrong while fetching your info. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="iconBadge" aria-hidden="true">
          <Search size={22} strokeWidth={2} />
        </div>
        <h1 className="title">Request Header Parser</h1>
        <p className="subtitle">
          Inspect the IP address, language, browser, and OS your request
          reveals, straight from your HTTP headers.
        </p>
        <button
          className="button"
          onClick={getInfo}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Loading…" : "Get My Info"}
        </button>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}
