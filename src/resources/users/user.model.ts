import { Schema, model } from 'mongoose';
import User from './user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
