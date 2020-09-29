import { Router } from "express";

import { login, register } from "../controllers/auth";

const authRouter: Router = Router();

//wordsRouter.get("/protected", getWordsList);

authRouter.post("/login", login);

authRouter.put("/register", register);

export { authRouter };
