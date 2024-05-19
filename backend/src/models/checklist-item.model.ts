import { Schema, model, Types } from 'mongoose';
import { IChecklistItem } from '../types';

const { ObjectId } = Types;

const checkListItemSchema = new Schema<IChecklistItem>(
  {
    title: { type: String, required: true },
    checklistId: { type: ObjectId, required: true, ref: 'CheckList' },
    isChecked: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const CheckList = model('CheckListItem', checkListItemSchema);

export default CheckList;
