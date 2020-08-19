import * as express from "express";

import appRouter from "./routes";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/words", appRouter);

app.listen(port, (err) => {
  console.log(`server is listening on ${port}`);
});
