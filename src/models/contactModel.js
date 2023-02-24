import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String,
        required: 'Enter an email'
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    age: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
