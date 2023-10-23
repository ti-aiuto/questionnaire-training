import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Hello Node.js!"));

serve({
  fetch: app.fetch,
  port: 8787,
});
