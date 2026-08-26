import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'driver';
  car_number?: string;
  is_active: boolean;
  created_at: Date;
  matchPassword(password: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      trim: true,
      lowercase: true,
    },
    password_hash: {
      type: String,
      required: [true, 'Please add a password'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'driver'],
      default: 'driver',
    },
    car_number: {
      type: String,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password_hash);
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function (): string {
  const secret = process.env.JWT_SECRET;
  const expire = process.env.JWT_EXPIRE;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id: this._id }, secret, {
    expiresIn: (expire || '30d') as SignOptions['expiresIn'],
  });
};

const User = mongoose.model<IUser>('Users', userSchema);

export default User;
