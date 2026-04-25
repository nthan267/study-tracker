import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStudySession extends Document {
    courseId: Types.ObjectId;
    taskId?: Types.ObjectId;
    duration: number;
    topics: string;
    notes?: string;
    productivity?: number;
    date: Date;
}

const StudySessionSchema: Schema = new Schema(
    {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
        duration: { type: Number, required: true, min: 1 },
        topics: { type: String, required: true },
        notes: { type: String, default: '' },
        productivity: { type: Number, min: 1, max: 5 },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<IStudySession>('StudySession', StudySessionSchema);