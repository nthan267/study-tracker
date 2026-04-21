import mongoose, { Schema, Document } from 'mongoose';

export interface IStudySession extends Document {
    course: string;
    duration: number;
    topics: string;
    notes?: string;
    date: Date;
    confidence?: number;
}

const StudySessionSchema: Schema = new Schema(
    {
        course: { type: String, required: true },
        duration: { type: Number, required: true, min: 1 },
        topics: { type: String, required: true },
        notes: { type: String, default: '' },
        date: { type: Date, default: Date.now },
        confidence: { type: Number, min: 1, max: 5 },
    },
    { timestamps: true }
);

export default mongoose.model<IStudySession>('StudySession', StudySessionSchema);