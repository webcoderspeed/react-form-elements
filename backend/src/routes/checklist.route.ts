import { Router } from 'express';
import * as checkListControllers from '../controllers/checklist.controller';
import * as checkListValidators from '../validators/checklist.validator';

const router = Router();

router
  .route('/')
  .post(
    checkListValidators.validateCreateCheckList,
    checkListControllers.createCheckList
  )
  .get(checkListControllers.getCheckLists);

router
  .route('/:id')
  .get(checkListControllers.getCheckList)
  .put(checkListControllers.updateCheckList)
  .delete(checkListControllers.deleteCheckList);

export default router;
