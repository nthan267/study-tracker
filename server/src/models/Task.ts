import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
    courseId: Types.ObjectId;
    type: 'assignment' | 'lab' | 'project' | 'reading' | 'exam';
    title: string;
    dueDate?: Date;
    status: 'not-started' | 'in-progress' | 'done';
    estimatedHours?: number;
    actualHours?: number;
    notes?: string;
}

const TaskSchema: Schema = new Schema(
    {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        type: {
            type: String,
            enum: ['assignment', 'lab', 'project', 'reading', 'exam'],
            required: true,
        },
        title: { type: String, required: true },
        dueDate: { type: Date },
        status: {
            type: String,
            enum: ['not-started', 'in-progress', 'done'],
            default: 'not-started',
        },
        estimatedHours: { type: Number, min: 0 },
        actualHours: { type: Number, min: 0, default: 0 },
        notes: { type: String, default: '' },
    },
    { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);