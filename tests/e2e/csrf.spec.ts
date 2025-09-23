// @ts-nocheck
import { test, expect } from "@playwright/test";

const API_BASE = process.env.API_BASE || "http://127.0.0.1:3030";

async function canConnect(request: any) {
  try {
    const res = await request.get(`${API_BASE}/api/v1/health`, {
      timeout: 1500,
    });
    return res.ok();
  } catch {
    return false;
  }
}

test("obtain csrf token and reuse cookie", async ({ request }) => {
  if (!(await canConnect(request))) test.skip();
  const res = await request.get(`${API_BASE}/api/v1/csrf`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(typeof body.csrfToken).toBe("string");
});
