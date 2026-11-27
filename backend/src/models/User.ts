import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export const ROLES = ['patient', 'doctor', 'admin'] as const;
export type Role = (typeof ROLES)[number];

export interface IUser {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: Role;
    refreshToken: string | null;
}

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
        refreshToken: { type: String, default: null, select: false },
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

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
