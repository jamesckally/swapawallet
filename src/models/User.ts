import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    twitterHandle: string;
    cantonId: string;
    ipAddress: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    twitterHandle: { type: String, required: true },
    cantonId: { type: String, required: true },
    ipAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation error in Next.js hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
