import Word from "../models/Word";

export const getWordsList = (req, res): void => {
  Word.getAll().then(words => {
    const preparedWords = words.map(({_id, value, translates}) => ({value, translates, id: _id.toString()}));

    res.status(200).json(preparedWords);
  }).catch(err => console.log(err));
};

export const addWord = (req, res): void => {
  const { value, translates } = req.body;

  new Word(value, translates).save()
    .then(() => res.status(201).json({ data: "Set word successfully!" }))
    .catch(err => console.log(err));
};

export const updateWord = (req, res): void => {
  const {id, value, translates} = req.body;

  new Word(value, translates, id).update()
    .then(() => res.status(201).json({data: "Was updated successfully."}))
    .catch(err => console.log(err));
};

export const removeWord = (req, res): void => {
  const {id} = req.query;

  Word.remove(id)
    .then(() => res.status(200).json({data: `Word ${id} was remmoved`}))
    .catch(err => console.log(err));
}
