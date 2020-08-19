import { Router } from "express";

import { getWordsList, setWord } from "../controllers";

const router = Router();

router.get("/list", getWordsList);

router.post("/setWord", setWord);

export default router;
