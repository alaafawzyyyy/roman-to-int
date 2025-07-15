import mongoose from 'mongoose';

const conversionSchema = new mongoose.Schema({
roman: { type: String, required: true },
integer: { type: Number, required: true },
createdAt: { type: Date, default: Date.now}
});

export default mongoose.model('Conversion', conversionSchema);
