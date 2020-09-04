import { Router } from "express";

import { getWordsList, addWord } from "../controllers";

const wordsRouter = Router();

wordsRouter.get("/list", getWordsList);

wordsRouter.post("/addWord",addWord);

export {wordsRouter};
