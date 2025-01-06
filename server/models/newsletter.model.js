import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
    }
}, { timestamps: true });

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
export default Newsletter;