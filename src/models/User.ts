import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  clerkUserId: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  // TODO: add amazon stuff
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String },
    avatarUrl: { type: String },
    // TODO: add amazon stuff
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
