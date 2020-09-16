import Word, { WordInstance } from "../models/Word";
import { Error400Handler } from "../utils/errors";

export type WordData = {
  id: string;
  value: string;
  translates: string[];
};

export type RequestBody = {
  id?: string;
  value?: string;
  translates?: string[];
};

export type RequestQuery = {
  id?: string;
};

export const getWordsList = async (req, res, next): Promise<void> => {
  try {
    const words: WordInstance[] = await Word.getAll();
    const preparedWords: WordData[] = words.map(
      ({ _id, value, translates }: WordInstance): WordData => ({
        value,
        translates,
        id: _id.toString(),
      })
    );

    res.status(200).json(preparedWords);
  } catch (err) {
    Error400Handler(err, next);
  }
};

export const addWord = async (req, res, next): Promise<void> => {
  const { value, translates }: RequestBody = req.body;

  try {
    const potentialWord: WordInstance = await Word.find(value);

    if (!potentialWord) {
      await new Word(value, translates).save();

      res.status(201).json({ data: "Set word successfully!" });
    } else {
      res.status(200).json({ data: `${value} already exists` });
    }
  } catch (err) {
    Error400Handler(err, next);
  }
};

export const updateWord = async (req, res, next): Promise<void> => {
  const { id, value, translates }: RequestBody = req.body;

  try {
    await new Word(value, translates, id).update();

    res.status(201).json({ data: "Was updated successfully." });
  } catch (err) {
    Error400Handler(err, next);
  }
};

export const removeWord = async (req, res, next): Promise<void> => {
  const { id = "" }: RequestQuery = req.query;

  try {
    await Word.remove(id);

    res.status(200).json({ data: `Word ${id} was remmoved` });
  } catch (err) {
    Error400Handler(err, next);
  }
};
