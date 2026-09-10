import mongoose, { Document, Schema } from 'mongoose';

export interface ITrip extends Document {
  from: string;
  to: string;
  date: Date;
  fuel_amount: number;
  liters: number;
  toll: boolean;
  toll_amount: number;
  phone_number: string;
  customer_name: string;
  trip_amount: number;
  created_by?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new Schema<ITrip>(
  {
    from: {
      type: String,
      required: [true, 'Please provide starting location (From)'],
      trim: true,
    },
    to: {
      type: String,
      required: [true, 'Please provide destination location (To)'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide trip date'],
      default: Date.now,
    },
    fuel_amount: {
      type: Number,
      default: 0,
    },
    liters: {
      type: Number,
      default: 0,
    },
    toll: {
      type: Boolean,
      default: false,
    },
    toll_amount: {
      type: Number,
      default: 0,
    },
    phone_number: {
      type: String,
      required: [true, 'Please provide customer phone number'],
      trim: true,
    },
    customer_name: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true,
    },
    trip_amount: {
      type: Number,
      required: [true, 'Please provide trip amount'],
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
    collection: 'trip', // Explicitly set collection name as 'trip'
  }
);

const Trip = mongoose.model<ITrip>('Trip', tripSchema, 'trip');

export default Trip;
