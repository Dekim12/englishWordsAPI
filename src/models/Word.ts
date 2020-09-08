import {ObjectId} from 'mongodb';

import Application from "../app";

const COLLECTION = 'words';

const getCollection = () => Application.getDbConnection.collection(COLLECTION);

export default class Word {
  private _id: ObjectId;
  private value: String;
  private translates: [String];

  constructor(value, translates, id?) {
    this._id = new ObjectId(id);
    this.value = value;
    this.translates = translates;
  }

  public static get(value: String) {}

  public static getAll() {
    return getCollection().find().toArray();
  }

  public static remove(id) {
    return getCollection().deleteOne({_id: new ObjectId(id)});
  }

  public save() {
    return getCollection().insertOne(this);
  }

  public update() {
    return getCollection().findOneAndUpdate({_id: this._id}, {$set: this})
  }
}
