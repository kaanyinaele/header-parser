export default function handler(req, res) {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const language = req.headers["accept-language"]
    ? req.headers["accept-language"].split(",")[0]
    : "en";
  const software = req.headers["user-agent"];

  res.status(200).json({
    ipaddress: ipAddress,
    language: language,
    software: software,
  });
}
