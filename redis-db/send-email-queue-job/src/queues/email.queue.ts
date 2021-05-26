import Bull from "bull";
import emailProcess from "../processes/email.process";
import { createBullBoard } from "bull-board";

const emailQueue = new Bull("email", {
  redis: process.env.REDIS_URL,
});

emailQueue.process(emailProcess);

const sendNewEmail = (data: any) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};

export { sendNewEmail };
