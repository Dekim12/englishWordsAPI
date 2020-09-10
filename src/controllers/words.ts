import Word from "../models/Word";
import { Error400Handler } from "../utils/errors";

export const getWordsList = (req, res, next): void => {
  Word.getAll()
    .then((words: [any]) => {
      const preparedWords = words.map(({ _id, value, translates }) => ({
        value,
        translates,
        id: _id.toString(),
      }));

      res.status(200).json(preparedWords);
    })
    .catch((err: Error) => Error400Handler(err, next));
};

export const addWord = (req, res, next): void => {
  const { value, translates } = req.body;

  new Word(value, translates)
    .save()
    .then(() => res.status(201).json({ data: "Set word successfully!" }))
    .catch((err: Error) => Error400Handler(err, next));
};

export const updateWord = (req, res, next): void => {
  const { id, value, translates } = req.body;

  new Word(value, translates, id)
    .update()
    .then(() => res.status(201).json({ data: "Was updated successfully." }))
    .catch((err: Error) => Error400Handler(err, next));
};

export const removeWord = (req, res, next): void => {
  const { id } = req.query;

  Word.remove(id)
    .then(() => res.status(200).json({ data: `Word ${id} was remmoved` }))
    .catch((err: Error) => Error400Handler(err, next));
};
