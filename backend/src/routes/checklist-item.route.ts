import { Router } from 'express';
import * as checkListItemControllers from '../controllers/checklist-item.controller';
import * as checkListItemValidators from '../validators/checklist-item.validator';

const router = Router();

router
  .route('/')
  .post(
    checkListItemValidators.validateCreateCheckListItem,
    checkListItemControllers.createCheckListItem
  )
  .get(checkListItemControllers.getCheckListItems);

router
  .route('/:id')
  .get(checkListItemControllers.getCheckListItem)
  .put(
    checkListItemValidators.validateUpdateCheckListItem,
    checkListItemControllers.updateCheckListItem
  )
  .delete(checkListItemControllers.deleteCheckListItem);

export default router;
