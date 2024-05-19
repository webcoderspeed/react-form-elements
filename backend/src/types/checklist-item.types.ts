import { IChecklist } from './checklist.types';

export interface IChecklistItem extends Document {
  _id: string;
  title: string;
  checklistId: IChecklist;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
