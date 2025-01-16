import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        amount: {
            type: Number,
            required: true,
            maxLength: 20,
            trim: true
        },
        date: {
            type: Date,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            maxLength: 50,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Income', IncomeSchema);
