import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: { type: 'Strong', required: true, trim: true, minLength: [3, "Закоротке ім'я"], maxLength: [30, "Задовге ім'я"] },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Пароль від 8 символів'],
        select: false,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
