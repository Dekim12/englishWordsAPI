import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import Word, { WordInterface, WordToResponse } from './Word.model';
import { Error400 } from '../../errors';

export type RequestBody = {
  id?: number | null;
  value?: string;
  translates?: string[];
  isLearned?: boolean;
};

export type RequestQuery = {
  id?: string;
};

export const getWordsList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const words: WordInterface[] = await Word.find();

    const wordsToResponse: (WordToResponse | WordInterface)[] = words.map((word: WordInterface) => {
      if (word.toResponse) {
        return word.toResponse();
      }

      return word;
    });

    res.status(200).json(wordsToResponse);
  } catch (err) {
    return next(err);
  }
};

export const addWord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { value = '', translates = [] }: RequestBody = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error400();
    }

    const potentialWord = await Word.findOne({ value });

    if (!potentialWord) {
      const word: { value: string; translates: string[] } = { value, translates };

      await Word.create(word);

      res.status(201).json({ data: 'Set word successfully!' });
    } else {
      res.status(406).json({ data: `< ${value} > already exists` });
    }
  } catch (err) {
    return next(err);
  }
};

export const updateWord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, value, translates, isLearned }: RequestBody = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error400();
    }

    const potentialWord = await Word.findOne({ value, _id: { $ne: id! } });

    if (!potentialWord) {
      await Word.updateOne({ _id: id! }, { value, translates, isLearned });

      res.status(201).json({ data: 'Was updated successfully' });
    } else {
      res.status(406).json({ data: `< ${value} > already exists` });
    }
  } catch (err) {
    return next(err);
  }
};

export const removeWord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id }: RequestQuery = req.query;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error400();
    }

    await Word.deleteOne({ _id: id });

    res.status(200).json({ data: `Word was removed by id: ${id}` });
  } catch (err) {
    return next(err);
  }
};
