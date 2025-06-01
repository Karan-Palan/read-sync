import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHighlight extends Document {
  userId: string;
  bookId: mongoose.Types.ObjectId;
  text: string;
  location?: string; // "Chaper 3, p 45"
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HighlightSchema: Schema<IHighlight> = new Schema(
  {
    userId: { type: String, required: true, ref: 'User' },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
    text: { type: String, required: true },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);

const Highlight: Model<IHighlight> = mongoose.model<IHighlight>('Highlight', HighlightSchema);
export default Highlight;
