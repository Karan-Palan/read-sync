import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBook extends Document {
  userId: string; //clerk
  title: string;
  authors: string[];
  year?: string;
  source: 'internet-archive' | 'libgen' | 'kindle' | 'local-upload';
  coverImageUrl?: string;
  format: 'EPUB' | 'PDF' | string;
  downloadUrl?: string;
  fileData: Buffer; // TODO: find permanent sol maybe aws
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema<IBook> = new Schema(
  {
    userId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    authors: { type: [String], default: [] },
    year: { type: String },
    source: {
      type: String,
      required: true,
      enum: ['internet-archive', 'libgen', 'kindle', 'local-upload'],
    },
    coverImageUrl: { type: String },
    downloadUrl: { type: String },
    fileData: { type: Buffer, required: true },
    format: { type: String, required: true, enum: ['EPUB', 'PDF'] },
  },
  {
    timestamps: true,
  }
);

const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);
export default Book;
