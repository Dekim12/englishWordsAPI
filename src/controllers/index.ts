import * as express from "express";

export const getWordsList = (req, res): void => {
  res.status(200).json({ data: "Hello World!" });
};

export const setWord = (req, res): void => {
  res.status(201).json({ data: "Set word successfully!" });
};
