import { Collection } from "mongodb";

import Application from "../app";

const getCollection = (collection: string): Collection =>
  Application.getDbConnection.collection(collection);

export { getCollection };
