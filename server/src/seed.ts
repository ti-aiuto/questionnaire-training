require("dotenv").config();

import mysql2 from "mysql2/promise";
import { sampleQuestionnaire } from "./sample";

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

async function main() {
  await mysqlPool.execute(
    "INSERT INTO questionnaires (questionnaire_id, title, questions) VALUES (?, ?, ?); ",
    [
      sampleQuestionnaire.questionnaire_id,
      sampleQuestionnaire.title,
      JSON.stringify(sampleQuestionnaire.questions),
    ]
  );
  await mysqlPool.end();
  console.log("完了");
}
main();
