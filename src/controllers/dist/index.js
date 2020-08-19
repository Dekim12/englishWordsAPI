"use strict";
exports.__esModule = true;
exports.setWord = exports.getWordsList = void 0;
exports.getWordsList = function (req, res) {
    res.status(200).json({ data: "Hello World!" });
};
exports.setWord = function (req, res) {
    res.status(201).json({ data: "Set word successfully!" });
};
