import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export const ROLES = ['patient', 'doctor', 'admin'] as const;
export type Role = (typeof ROLES)[number];

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: [
                function (this: IUser) {
                    return this.role !== 'admin';
                },
                "Ім'я обов'язкове",
            ],
            trim: true,
            minLength: [2, "Закоротке ім'я"],
            maxLength: [50, "Задовге ім'я"],
        },
        lastName: {
            type: String,
            required: [
                function (this: IUser) {
                    return this.role !== 'admin';
                },
                "Прізвище обов'язкове",
            ],
            trim: true,
            minLength: [2, 'Закоротке прізвище'],
            maxLength: [50, 'Задовге прізвище'],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ROLES, default: 'patient', required: true },
    },
    { timestamps: true },
);
userSchema.set('toJSON', {
    versionKey: false,
    transform: (_doc, ret) => {
        const { password, ...safe } = ret;
        return safe;
    },
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

export default User;
