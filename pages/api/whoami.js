import { UAParser } from "ua-parser-js";

export default function handler(req, res) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ipAddress = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : req.socket.remoteAddress;
  const language = req.headers["accept-language"]
    ? req.headers["accept-language"].split(",")[0]
    : "en";
  const software = req.headers["user-agent"];
  const { browser, os, device } = UAParser(software || "");

  res.status(200).json({
    ipaddress: ipAddress,
    language: language,
    software: software,
    browser: browser.name
      ? { name: browser.name, version: browser.version }
      : null,
    os: os.name ? { name: os.name, version: os.version } : null,
    device: device.type
      ? { type: device.type, vendor: device.vendor, model: device.model }
      : null,
  });
}
