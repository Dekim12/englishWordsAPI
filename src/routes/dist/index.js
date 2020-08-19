"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var router = express_1.Router();
router.get("/list", controllers_1.getWordsList);
router.post("/setWord", controllers_1.setWord);
exports["default"] = router;
