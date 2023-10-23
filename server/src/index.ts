import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { sampleQuestionnaire, sampleResult } from "./sample";

const app = new Hono();
app.use("*", logger());

app.get("/api/v1/questionnaires/sample/builder", (c) => c.json(sampleQuestionnaire));
app.post("/api/v1/questionnaires/sample/builder", (c) => c.json(sampleQuestionnaire));
app.get("/api/v1/questionnaires/sample/form", (c) => c.json(sampleQuestionnaire));
app.get("/api/v1/questionnaires/sample/result", (c) => c.json(sampleResult));

serve({
  fetch: app.fetch,
  port: 8787,
});
