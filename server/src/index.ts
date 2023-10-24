import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import mysql2, { RowDataPacket } from "mysql2/promise";
import { sampleQuestionnaire, sampleResult } from "./sample";

require('dotenv').config();

const mysqlPool = mysql2.createPool({
  host: process.env.QUESTIONNAIRE_DB_HOST,
  port: 3306,
  user: process.env.QUESTIONNAIRE_DB_USER,
  password: process.env.QUESTIONNAIRE_DB_PASSWORD,
  database: process.env.QUESTIONNAIRE_DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
});

const app = new Hono();
app.use("*", logger());

// 開発用
app.use(
  "/api/*",
  cors({
    origin: "*",
    allowHeaders: ["*"],
    allowMethods: ["*"],
    exposeHeaders: ["*"],
    maxAge: 600,
  })
);

app.get("/api/v1/questionnaires/sample/builder", (c) =>
  c.json({ questionnaire: sampleQuestionnaire })
);
app.put("/api/v1/questionnaires/sample/builder", (c) =>
  c.json({ questionnaire: sampleQuestionnaire })
);
app.get("/api/v1/questionnaires/sample/form", async (c) => {
  // const [[questionnaire]] = await mysqlPool.query<RowDataPacket[]>("SELECT questionnaire_id, title, questions FROM `questionnaires` WHERE questionnaire_id = 1");
  // return c.json({ questionnaire })
  return c.json({ questionnaire: sampleQuestionnaire })
}
);
app.post("/api/v1/questionnaires/sample/answers", (c) =>
  c.json({ questionnaire: sampleQuestionnaire })
);
app.get("/api/v1/questionnaires/sample/result", (c) =>
  c.json({ questionnaire_result: sampleResult })
);

serve({
  fetch: app.fetch,
  port: 8787,
});
