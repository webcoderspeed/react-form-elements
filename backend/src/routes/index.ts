import { Application } from 'express';
import checklistRoutes from './checklist.route';
import checklistItemRoutes from './checklist-item.route'

const baseURL = '/api/v1';

const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).json({
      version: '1.0.0',
      message: 'Listening to react-form-elements api...',
    });
  });

  // checklists routes
  app.use(`${baseURL}/checklists`, checklistRoutes);

  // checklist-items
  app.use(`${baseURL}/checklist-items`, checklistItemRoutes);
};

export default routes;
