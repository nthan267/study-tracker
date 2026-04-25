import mongoose, { Schema, Document } from 'mongoose'


/*
    used for compile time checking of what should be in the document
    TypeScript of what Document should include
     */

export interface IStudySession extends Document {
    course: string;
    duration: number;
    topics: string;
    notes?: string;
    date?: Date;
    productivity?: number;

}

/*
    it won't create a document if any required field is missing.
     */
const StudySessionSchema: Schema = new Schema(
    {
        course: { type: String, required: true },
        duration: { type: Number, required: true, min: 1 },
        topics: { type: String, required: true },
        notes: { type: String, default: '' },
        date: { type: Date, default: Date.now },
        productivity: { type: Number, min: 1, max: 5 },
    },
    { timestamps: true }

);

/*
creates a model based on my schema which my backend can use
 */
export default mongoose.model<IStudySession>
('StudySession', StudySessionSchema);


