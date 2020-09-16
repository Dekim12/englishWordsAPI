import {
  ObjectId,
  Collection,
  InsertOneWriteOpResult,
  FindAndModifyWriteOpResultObject,
  DeleteWriteOpResultObject,
} from "mongodb";

import Application from "../app";

const COLLECTION: string = "words";

const getCollection = (): Collection =>
  Application.getDbConnection.collection(COLLECTION);

export interface WordInterface {
  save(): Promise<InsertOneWriteOpResult<any>>;
  update(): Promise<FindAndModifyWriteOpResultObject<any>>;
}

export interface WordInstance {
  _id: ObjectId;
  value: string;
  translates: string[];
}

export default class Word implements WordInterface {
  private _id: ObjectId;
  private value: string;
  private translates: string[];

  constructor(value, translates, id?: string) {
    this._id = new ObjectId(id);
    this.value = value || "";
    this.translates = translates || [];
  }

  public static find(value?: string) {
    return getCollection().findOne({ value });
  }

  public static getAll(): Promise<any[]> {
    return getCollection().find().toArray();
  }

  public static remove(id: string): Promise<DeleteWriteOpResultObject> {
    return getCollection().deleteOne({ _id: new ObjectId(id) });
  }

  public save() {
    return getCollection().insertOne(this);
  }

  public update() {
    return getCollection().findOneAndUpdate({ _id: this._id }, { $set: this });
  }
}
