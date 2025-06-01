import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISummary extends Document {
  userId: string;
  bookId: mongoose.Types.ObjectId;
  highlightIds?: mongoose.Types.ObjectId[];
  content: string; // AI-generated summary (Markdown)
  modelUsed: string; // e.g. "gemini-2.0"
  createdAt: Date;
  updatedAt: Date;
}

const SummarySchema: Schema<ISummary> = new Schema(
  {
    userId: { type: String, required: true, ref: 'User' },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
    highlightIds: [{ type: Schema.Types.ObjectId, ref: 'Highlight' }],
    content: { type: String, required: true },
    modelUsed: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Summary: Model<ISummary> = mongoose.model<ISummary>('Summary', SummarySchema);
export default Summary;
