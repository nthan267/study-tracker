import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    code: string;
    name: string;
    semester: string;
    color?: string;
    targetHours?: number;
}

const CourseSchema: Schema = new Schema(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
        semester: { type: String, required: true },
        color: { type: String, default: '#8b6f47' },
        targetHours: { type: Number, default: 5 },
    },
    { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);