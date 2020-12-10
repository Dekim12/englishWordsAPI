import { body, query } from 'express-validator';

export const wordsBodyValidators = {
  value: body('value').isString().isAlphanumeric().isLength({ min: 3, max: 30 }).exists().trim(),
  translates: body('translates').isArray({ min: 1, max: 5 }).exists(),
  translatesItem: body('translates.*').isString().isLength({ min: 3, max: 30 }).exists().trim(),
  id: body('id').isMongoId().exists().trim(),
  isLearned: body('isLearned').isBoolean().exists(),
};

export const wordsQueryValidators = {
  id: query('id').isMongoId().exists().trim(),
};
