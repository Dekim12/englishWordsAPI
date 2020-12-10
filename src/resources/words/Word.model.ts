import { Schema, model, Document } from 'mongoose';

export interface WordToResponse {
  id: number;
  value: string;
  translates: string[];
  createdAt: string;
  isLearned: boolean;
}

export interface WordInterface extends Document {
  _id?: number;
  value: string;
  translates: string[];
  createdAt?: string;
  isLearned?: boolean;
  toResponse?: () => WordToResponse;
}

const WordSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    translates: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: String,
      default: () => new Date().toLocaleDateString(),
    },
    isLearned: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

WordSchema.method('toResponse', function (): WordToResponse {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export default model<WordInterface>('Word', WordSchema);
