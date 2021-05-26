import express from "express";
import { sendNewEmail } from "./queues/email.queue";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/email", async (req, res) => {
  const { message, ...reqBody } = req.body;
  await sendNewEmail({ ...reqBody, html: `<p>${req.body.message}</p>` });
  res.send({ status: "ok" });
});

app.listen(5000, () => console.log("App running on port 5000"));
