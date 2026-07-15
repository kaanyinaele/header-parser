import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/whoami";

describe("/api/whoami", () => {
  const CHROME_MAC_UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

  it("returns the first IP from x-forwarded-for, trimmed", () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: {
        "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178",
        "accept-language": "en-US,en;q=0.9",
        "user-agent": CHROME_MAC_UA,
      },
    });

    handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      ipaddress: "203.0.113.5",
      language: "en-US",
      software: CHROME_MAC_UA,
      browser: { name: "Chrome", version: "128.0.0.0" },
      os: { name: "macOS", version: "10.15.7" },
      device: null,
    });
  });

  it("returns null browser/os/device for an unrecognized user-agent", () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: { "user-agent": "test-agent" },
    });
    req.socket = { remoteAddress: "127.0.0.1" };

    handler(req, res);

    const body = JSON.parse(res._getData());
    expect(body.browser).toBeNull();
    expect(body.os).toBeNull();
    expect(body.device).toBeNull();
  });

  it("falls back to the socket address when x-forwarded-for is absent", () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: {},
    });
    req.socket = { remoteAddress: "127.0.0.1" };

    handler(req, res);

    expect(JSON.parse(res._getData()).ipaddress).toBe("127.0.0.1");
  });

  it("defaults language to en when accept-language is missing", () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: {},
    });
    req.socket = { remoteAddress: "127.0.0.1" };

    handler(req, res);

    expect(JSON.parse(res._getData()).language).toBe("en");
  });
});
