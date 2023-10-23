import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from 'hono/logger'

import {
  question1,
  question2,
  question3,
  question4,
  sampleQuestionnaire,
} from "./sample";

const app = new Hono();
app.use('*', logger())

app.get("/questionnaires/sample/form", (c) => c.json(sampleQuestionnaire));
app.get("/questionnaires/sample/result", (c) =>
  c.json({
    questionnaire: sampleQuestionnaire,
    aggregated_questions: [
      {
        question: question1,
        aggregated_options: [
          {
            label: "うどん",
            count: 2,
          },
          {
            label: "ごはん",
            count: 3,
          },
          {
            label: "パン",
            count: 5,
          },
        ],
      },
      {
        question: question2,
        aggregated_options: [
          {
            label: "うどん",
            count: 2,
          },
          {
            label: "ごはん",
            count: 3,
          },
          {
            label: "パン",
            count: 5,
          },
        ],
      },
      {
        question: question3,
        aggregated_options: [
          {
            label: "うどんが好きです",
            count: 1,
          },
          {
            label: "ごはんが好きです",
            count: 1,
          },
        ],
      },
      {
        question: question4,
        aggregated_options: [
          {
            label: "うどんが好きです",
            count: 1,
          },
          {
            label: "ごはんが好きです",
            count: 1,
          },
        ],
      },
    ],
  })
);

serve({
  fetch: app.fetch,
  port: 8787,
});
