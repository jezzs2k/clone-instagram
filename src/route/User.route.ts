import { UserController } from '../controller/User.controller';
import { checkToken } from '../middleware/auth.middleware';
const userController = new UserController();

export default [
  {
    method: 'put',
    route: '/api/users',
    controller: UserController,
    middleware: [checkToken],
    action: userController.updateUser,
  },
];
