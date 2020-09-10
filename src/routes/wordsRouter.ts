import { Router } from "express";

import {
  getWordsList,
  addWord,
  updateWord,
  removeWord,
} from "../controllers/words";

const wordsRouter = Router();

wordsRouter.get("/list", getWordsList);

wordsRouter.post("/add", addWord);

wordsRouter.put("/update", updateWord);

wordsRouter.delete("/remove", removeWord);

export { wordsRouter };
