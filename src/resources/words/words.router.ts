import { Router } from 'express';

import { getWordsList, addWord, updateWord, removeWord } from './words.controllers';
import { wordsBodyValidators, wordsQueryValidators } from '../../validator';

const wordsRouter: Router = Router();

wordsRouter.get('/list', getWordsList);

wordsRouter.post(
  '/add',
  [wordsBodyValidators.value, wordsBodyValidators.translates, wordsBodyValidators.translatesItem],
  addWord
);

wordsRouter.put(
  '/update',
  [
    wordsBodyValidators.id,
    wordsBodyValidators.value,
    wordsBodyValidators.translates,
    wordsBodyValidators.translatesItem,
    wordsBodyValidators.isLearned,
  ],
  updateWord
);

wordsRouter.delete('/remove', [wordsQueryValidators.id], removeWord);

export default wordsRouter;
