import {
  ObjectId,
  InsertOneWriteOpResult,
  FindAndModifyWriteOpResultObject,
  DeleteWriteOpResultObject,
} from "mongodb";

import { getCollection } from "../utils";

const COLLECTION: string = "words";

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

  public static find(value?: string): Promise<any> {
    return getCollection(COLLECTION).findOne({ value });
  }

  public static getAll(): Promise<any[]> {
    return getCollection(COLLECTION).find().toArray();
  }

  public static remove(id: string): Promise<DeleteWriteOpResultObject> {
    return getCollection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
  }

  public save() {
    return getCollection(COLLECTION).insertOne(this);
  }

  public update() {
    return getCollection(COLLECTION).findOneAndUpdate(
      { _id: this._id },
      { $set: this }
    );
  }
}
