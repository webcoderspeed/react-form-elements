import { Schema, model } from 'mongoose';
import { IChecklist } from '../types';

const checkListSchema = new Schema<IChecklist>(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CheckList = model<IChecklist>('CheckList', checkListSchema);

export default CheckList;
