import { ObjectId } from "mongodb";

import { getCollection } from "../utils";

const COLLECTION: string = "users";

export interface UserInterface {}

export interface UserInstance {
  _id: ObjectId;
  name: string;
  email: string;
}

export default class User implements UserInterface {
  private _id: ObjectId;
  private name: string;
  private email: string;
  private password: string;
  private salt: string;

  constructor(name, email, password, id?: string) {
    this._id = new ObjectId(id);
  }

  public static find(email: string) {
    return getCollection(COLLECTION).findOne({ email });
  }

  public save() {
    return getCollection(COLLECTION).insertOne(this);
  }
}
